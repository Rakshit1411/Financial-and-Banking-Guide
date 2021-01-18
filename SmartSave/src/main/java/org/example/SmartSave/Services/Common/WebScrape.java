package org.example.SmartSave.Services.Common;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class WebScrape {
    public void read(){
        Document doc = null;
        try {
            doc = Jsoup.connect("https://www.bankbazaar.com/fixed-deposit/sbi-fixed-deposit-rate.html").get();
            Elements links = doc.select("a[href]");
            Elements media = doc.select("[src]");
            Elements imports = doc.select("link[href]");
            Element data = doc.select("div.hungry-table").get(0);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
