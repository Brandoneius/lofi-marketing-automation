from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# Selenium WebDriver setup
driver = webdriver.Chrome()  # Ensure ChromeDriver is installed and in PATH
driver.get("https://www.reddit.com/r/Lofi_Beats_Submission/")

time.sleep(5)  # Wait for initial content load

# Scroll to load more posts
for i in range(5):  # Adjust the range for desired number of scrolls
    driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.END)
    time.sleep(3)  # Wait for new content to load after each scroll

# Find all links and filter by title
all_links = driver.find_elements(By.TAG_NAME, 'a')
for link in all_links:
    try:
        title = link.get_attribute('aria-label')
        if title and "submission" in title.lower():
            link_url = link.get_attribute('href')
            print("Title containing 'submission':", title)
            print("Link:", link_url)
    except Exception as e:
        print("Error processing link:", e)

# Close the Selenium WebDriver
driver.quit()
