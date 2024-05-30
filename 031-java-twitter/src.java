import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

public class TwitterImageDownloader {
    public static void main(String[] args) throws IOException {
        System.setProperty("webdriver.chrome.driver", "path/to/chromedriver");

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        WebDriver driver = new ChromeDriver(options);

        driver.get("https://twitter.com/usern001/likes");

        WebDriverWait wait = new WebDriverWait(driver, 10);

        while (true) {
            driver.executeScript("window.scrollBy(0, window.innerHeight);");
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            By by = By.cssSelector("a[role='link']");
            wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(by));
            List<WebElement> elements = driver.findElements(by);

            for (WebElement element : elements) {
                String href = element.getAttribute("href");
                List<WebElement> imgs = element.findElements(By.cssSelector("img"));

                for (WebElement img : imgs) {
                    String imgSrc = img.getAttribute("src");
                    if (imgSrc.contains("pbs.twimg.com/media/")) {
                        String suggestedFilename = href.substring(href.lastIndexOf('/') + 1) + "_" + imgSrc.substring(imgSrc.lastIndexOf('/') + 1);
                        File imageFile = new File("tweet_images/" + suggestedFilename);

                        if (imageFile.exists()) {
                            System.out.println("Image already exists: " + imageFile.getAbsolutePath());
                            break;
                        }

                        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
                            HttpGet request = new HttpGet(imgSrc);
                            httpClient.execute(request, httpResponse -> {
                                Path path = Files.createFile(Paths.get(imageFile.getAbsolutePath()));
                                Files.copy(httpResponse.getEntity().getContent(), path);
                                System.out.println("Image saved: " + imageFile.getAbsolutePath());
                                return null;
                            });
                        }
                    }
                }
            }
        }
    }
}