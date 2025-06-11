import csv
import time
import re
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup

class SoupBookingScraper:
    def __init__(self, hotel_urls):
        self.hotel_urls = hotel_urls
        self.driver = None

    def setup_driver(self):
        """Setup Chrome driver for page loading"""
        chrome_options = Options()
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-blink-features=AutomationControlled")
        
        # chrome_options.add_argument("--headless")
        
        self.driver = webdriver.Chrome(
            service=webdriver.chrome.service.Service(ChromeDriverManager().install()),
            options=chrome_options
        )
        
        self.driver.set_page_load_timeout(60)
        self.driver.implicitly_wait(10)

    def handle_popups(self):
        """Handle cookies and modals with Selenium"""
        print("    Handling popups...")
        
        # Handle cookies
        try:
            cookie_button = WebDriverWait(self.driver, 15).until(
                EC.element_to_be_clickable((By.ID, "onetrust-accept-btn-handler"))
            )
            cookie_button.click()
            time.sleep(2)
            print("    Cookies accepted")
        except Exception:
            print("    No cookie banner")
        
        # Handle sign-in modal
        try:
            signin_dismiss = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, "[role=\"dialog\"] button[aria-label*=\"Dismiss\"]"))
            )
            signin_dismiss.click()
            time.sleep(2)
            print("    Sign-in modal dismissed")
        except Exception:
            print("    No sign-in modal")
        
        time.sleep(3)

    def load_page_with_selenium(self, url):
        """Load page with Selenium and return BeautifulSoup object"""
        print(f"  Loading page with Selenium...")
        self.driver.get(url)
        time.sleep(8)
        
        # Handle popups
        self.handle_popups()
        
        # Scroll to ensure reviews are loaded
        print("  Scrolling to load reviews...")
        for i in range(6):
            scroll_position = i * 0.15
            self.driver.execute_script(f"window.scrollTo(0, document.body.scrollHeight*{scroll_position});")
            time.sleep(2)
        
        # Wait for reviews to load
        print("  Waiting for reviews to load...")
        time.sleep(10)
        
        # Get page source and create BeautifulSoup object
        page_source = self.driver.page_source
        soup = BeautifulSoup(page_source, 'html.parser')
        
        print("  Page loaded and parsed with BeautifulSoup")
        return soup

    def extract_hotel_name(self, soup):
        """Extract hotel name using BeautifulSoup"""
        # Try multiple selectors
        name_selectors = ['h2[data-testid="title"]', 'h1', 'h2']
        
        for selector in name_selectors:
            name_element = soup.select_one(selector)
            if name_element and name_element.get_text(strip=True):
                return name_element.get_text(strip=True)
        
        return "Unknown Hotel"

    def find_review_cards(self, soup):
        """Find review cards using BeautifulSoup navigation"""
        print("    Finding review cards with BeautifulSoup...")
        
        # Step 1: Find the review list container
        review_container = soup.select_one('div[data-testid="review-list-container"]')
        
        if not review_container:
            print("    No review list container found")
            return []
        
        print("    Found review list container")
        
        # Step 2: Find all elements with review-title within the container
        title_elements = review_container.select('[data-testid="review-title"]')
        print(f"    Found {len(title_elements)} review titles")
        
        # Step 3: Navigate up to find parent containers (review cards)
        review_cards = []
        
        for title_element in title_elements:
            # Navigate up the DOM to find the review card container
            current = title_element
            
            for level in range(1, 6):  # Try up to 5 levels up
                current = current.parent
                if not current:
                    break
                
                review_components = current.select('[data-testid^="review-"]')
                
                if len(review_components) >= 3:  
                    review_cards.append(current)
                    break
        
        print(f"    Identified {len(review_cards)} review card containers")
        return review_cards

    def extract_review_data(self, review_card, hotel_id):
        """Extract review data from a single review card using BeautifulSoup"""
        review_data = {
            'hotel_id': hotel_id,
            'username': 'Anonymous',
            'title': '',
            'content': '',
            'rating': 4.0,
            'date': '2024-01-15',
            'stay_info': '',
            'traveler_type': ''
        }
        
        # Extract username using static selector
        username_element = review_card.select_one('[data-testid="review-author-name"]')
        if username_element:
            review_data['username'] = username_element.get_text(strip=True)
        
        # Extract title using static selector
        title_element = review_card.select_one('[data-testid="review-title"]')
        if title_element:
            review_data['title'] = title_element.get_text(strip=True)
        
        # Extract rating using static selector
        score_element = review_card.select_one('[data-testid="review-score"]')
        if score_element:
            score_text = score_element.get_text(strip=True)
            numbers = re.findall(r'\d+\.?\d*', score_text)
            if numbers:
                rating = float(numbers[0])
                if rating > 5:  
                    rating = rating / 2
                review_data['rating'] = round(rating, 1)
        
        # Extract positive review text using static selector
        positive_element = review_card.select_one('[data-testid="review-positive-text"]')
        positive_text = positive_element.get_text(strip=True) if positive_element else ""
        
        # Extract negative review text using static selector
        negative_element = review_card.select_one('[data-testid="review-negative-text"]')
        negative_text = negative_element.get_text(strip=True) if negative_element else ""
        
        # Combine positive and negative content
        content = f"{positive_text} {negative_text}".strip()
        if not content and review_data['title']:
            content = review_data['title']
        
        review_data['content'] = content[:500]  # Limit content length
        
        # Extract date using static selector
        date_element = review_card.select_one('[data-testid="review-date"]')
        if date_element:
            date_text = date_element.get_text(strip=True)
            review_data['date'] = date_text.replace("Reviewed: ", "")
        
        # Extract stay info using static selector
        stay_element = review_card.select_one('[data-testid="review-stay-info"]')
        if stay_element:
            review_data['stay_info'] = stay_element.get_text(strip=True)
        
        # Extract traveler type using static selector
        traveler_element = review_card.select_one('[data-testid="review-traveler-type"]')
        if traveler_element:
            review_data['traveler_type'] = traveler_element.get_text(strip=True)
        
        return review_data

    def run(self):
        """Main execution using Selenium + BeautifulSoup"""
        self.setup_driver()
        hotels_data = []
        reviews_data = []
        users_data = set()

        try:
            for hotel_id, url in enumerate(self.hotel_urls, 1):
                print(f"\n{'-'*70}")
                print(f"PROCESSING HOTEL {hotel_id}/10")
                print(f"URL: {url[:70]}...")
                print(f"{'-'*70}")

                # Load page with Selenium and get BeautifulSoup object
                soup = self.load_page_with_selenium(url)
                
                # Extract hotel name
                hotel_name = self.extract_hotel_name(soup)
                print(f"  Hotel: {hotel_name}")
                
                # Determine location from URL
                if '/ro/' in url:
                    location = "Bucharest, Romania"
                elif '/fr/' in url:
                    location = "Paris, France"
                elif '/cn/' in url:
                    location = "Beijing, China"
                else:
                    location = "Unknown"
                
                # Find review cards using BeautifulSoup
                review_cards = self.find_review_cards(soup)
                
                if not review_cards:
                    print(f"  HOTEL {hotel_id} SKIPPED: No review cards found")
                    continue
                
                # Extract data from each review card
                hotel_reviews = []
                
                for j, review_card in enumerate(review_cards[:15]):
                    print(f"    Processing review {j+1}...")
                    
                    try:
                        review_data = self.extract_review_data(review_card, hotel_id)
                        
                        
                        print(f"      Username: {review_data['username']}")
                        print(f"      Content: {len(review_data['content'])} chars")
                        print(f"      Rating: {review_data['rating']}")
                        
                        
                        if review_data['content']:
                            hotel_reviews.append({
                                'hotel_id': hotel_id,
                                'username': review_data['username'],
                                'title': review_data['title'][:100] if review_data['title'] else review_data['content'][:100],
                                'content': review_data['content'],
                                'overall_rating': review_data['rating'],
                                'review_date': review_data['date'],
                                'stay_info': review_data['stay_info'],
                                'traveler_type': review_data['traveler_type'],
                                'helpful_votes': 0,
                                'platform': 'booking_soup'
                            })
                            users_data.add(review_data['username'])
                            print(f"      REVIEW {j+1} SAVED")
                        else:
                            print(f"      REVIEW {j+1} SKIPPED - no content")
                    
                    except Exception as e:
                        print(f"      ERROR processing review {j+1}: {e}")
                        continue
                
                
                if hotel_reviews:
                    hotels_data.append({
                        'globalpropertyid': hotel_id,
                        'globalpropertyname': hotel_name,
                        'propertyaddress1': location,
                        'sabrepropertyrating': 4.5,
                        'propertylatitude': 44.4268 if 'Romania' in location else (48.8566 if 'France' in location else 39.9042),
                        'propertylongitude': 26.1025 if 'Romania' in location else (2.3522 if 'France' in location else 116.4074)
                    })

                    reviews_data.extend(hotel_reviews)
                    print(f"\n  HOTEL {hotel_id} SUCCESS: {hotel_name} with {len(hotel_reviews)} reviews")
                else:
                    print(f"\n  HOTEL {hotel_id} SKIPPED: No reviews found")

                
                time.sleep(5)

            
            if hotels_data and reviews_data:
                users_list = [{'username': username, 'review_count': 1} for username in users_data]

                # Save hotels
                with open('hotels.csv', 'w', newline='', encoding='utf-8') as f:
                    fieldnames = ['globalpropertyid', 'globalpropertyname', 'propertyaddress1', 'sabrepropertyrating', 'propertylatitude', 'propertylongitude']
                    writer = csv.DictWriter(f, fieldnames=fieldnames)
                    writer.writeheader()
                    writer.writerows(hotels_data)

                # Save users
                with open('users.csv', 'w', newline='', encoding='utf-8') as f:
                    fieldnames = ['username', 'review_count']
                    writer = csv.DictWriter(f, fieldnames=fieldnames)
                    writer.writeheader()
                    writer.writerows(users_list)

                # Save reviews
                with open('reviews.csv', 'w', newline='', encoding='utf-8') as f:
                    fieldnames = ['hotel_id', 'username', 'title', 'content', 'overall_rating', 'review_date', 'stay_info', 'traveler_type', 'helpful_votes', 'platform']
                    writer = csv.DictWriter(f, fieldnames=fieldnames)
                    writer.writeheader()
                    writer.writerows(reviews_data)

                print(f"\n{'-'*50}")
                print(f"BEAUTIFULSOUP SUCCESS")
                print(f"Hotels: {len(hotels_data)}")
                print(f"Users: {len(users_list)}")
                print(f"Reviews: {len(reviews_data)}")
                print("Files: hotels.csv, users.csv, reviews.csv")
            else:
                print(f"\nNO DATA EXTRACTED")

        except Exception as e:
            print(f"Critical error: {e}")
        
        finally:
            if self.driver:
                self.driver.quit()
                print("Driver closed")

if __name__ == "__main__":
    hotel_urls = [
        "https://www.booking.com/hotel/ro/sofitel-bucharest.en-gb.html#tab-reviews",
        "https://www.booking.com/hotel/ro/love-room.html#tab-reviews",
        "https://www.booking.com/hotel/ro/monaco-towers-apartments.html#tab-reviews",
        "https://www.booking.com/hotel/fr/numa-paris-champs-elysees.en-gb.html#tab-reviews",
        "https://www.booking.com/hotel/fr/masion-le-bac-apt-101b.en-gb.html#tab-reviews",
        "https://www.booking.com/hotel/fr/guestready-bright-and-cosy-apt-w-47-effeil-tower-view.en-gb.html#tab-reviews",
        "https://www.booking.com/hotel/fr/luxurious-apartment-next-to-arc-de-triomphe.en-gb.html#tab-reviews",
        "https://www.booking.com/hotel/fr/urban-flat-150-pretty-flat-in-center-of-paris.en-gb.html#tab-reviews",
        "https://www.booking.com/hotel/cn/bei-jing-da-xing-guo-ji-ji-chang-mu-mian-hua-jiu-dian.en-gb.html#tab-reviews",
        "https://www.booking.com/hotel/cn/zi-long-hua-yuan-jiu-dian.en-gb.html#tab-reviews"
    ]

    scraper = SoupBookingScraper(hotel_urls)
    scraper.run()
