package org.example.SmartSave.Services.Common;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.example.SmartSave.Model.BusinessCategory;
import org.example.SmartSave.Repository.BusinessCategoryRepository;
import org.example.SmartSave.Services.Common.EsService;
import org.example.SmartSave.Services.Common.HttpService;
import org.example.SmartSave.Services.Sms.SmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;
import tech.tablesaw.api.DateColumn;
import tech.tablesaw.api.Table;
import tech.tablesaw.selection.Selection;

import javax.mail.*;
import javax.mail.internet.*;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

@Service
public class MailService {

    private MailSender mailSender;

    @Value( "${mail.email}" )
    String email;
    @Value( "${mail.password}" )
    String password;
    @Value( "${mail.sender}" )
    String sender;

    public void setMailSender(MailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendMail(String to, String subject, String body) throws MessagingException, IOException {
        //creating message
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(email, password);
            }
        });
        Message msg = new MimeMessage(session);

        msg.setFrom(new InternetAddress(sender,sender,sender));
        msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
        msg.setSubject(subject);
        msg.setContent(body, "text/html");
        msg.setSentDate(new Date());

        Transport.send(msg);
    }


}
