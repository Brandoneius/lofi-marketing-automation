import sqlite3
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# Database setup
conn = sqlite3.connect('lofi_links.db')
cursor = conn.cursor()
cursor.execute('''CREATE TABLE IF NOT EXISTS links 
                  (id INTEGER PRIMARY KEY, url TEXT UNIQUE, title TEXT)''')

# Selenium WebDriver setup
driver = webdriver.Chrome()
driver.get("https://www.reddit.com/r/Lofi_Beats_Submission/")

time.sleep(5)

# Scroll to load more posts
for i in range(10):
    driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.END)
    time.sleep(3)

# Find all links and filter by title
all_links = driver.find_elements(By.TAG_NAME, 'a')
for link in all_links:
    try:
        title = link.get_attribute('aria-label')
        if title and "submission" in title.lower():
            link_url = link.get_attribute('href')

            # Check if the URL already exists in the database
            cursor.execute('SELECT url FROM links WHERE url = ?', (link_url,))
            if not cursor.fetchone():
                # URL not found, proceed to insert
                cursor.execute('INSERT INTO links (url, title) VALUES (?, ?)', (link_url, title))
                conn.commit()
            else:
                print("Duplicate link skipped:", link_url)
    except Exception as e:
        print("Error processing link:", e)

driver.quit()
conn.close()
