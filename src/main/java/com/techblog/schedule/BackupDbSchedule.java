package com.techblog.schedule;

import com.smattme.MysqlExportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Properties;

@Slf4j
@Component
@RequiredArgsConstructor
public class BackupDbSchedule {

    @Scheduled(cron = "0 0/1 * 1/1 * ?")
    public void backup() throws SQLException, IOException, ClassNotFoundException {
        Properties properties = new Properties();
        properties.setProperty(MysqlExportService.DB_NAME, "devskill");
        properties.setProperty(MysqlExportService.DB_USERNAME, "quanghoa");
        properties.setProperty(MysqlExportService.DB_PASSWORD, "Quanghoa1993");
        properties.setProperty(MysqlExportService.JDBC_DRIVER_NAME, "com.mysql.jdbc.Driver");
        properties.setProperty(MysqlExportService.JDBC_CONNECTION_STRING, "jdbc:mysql://db4free.net:3306/devskill");

        //properties relating to email config
        properties.setProperty(MysqlExportService.EMAIL_HOST, "smtp.gmail.com");
        properties.setProperty(MysqlExportService.EMAIL_PORT, "587");
        properties.setProperty(MysqlExportService.EMAIL_USERNAME, "devfunny123@gmail.com");
        properties.setProperty(MysqlExportService.EMAIL_PASSWORD, "Quanghoa1993");
        properties.setProperty(MysqlExportService.EMAIL_FROM, "devfunny123@gmail.com");
        properties.setProperty(MysqlExportService.EMAIL_TO, "hoa9x3@gmail.com");

        //set the outputs temp dir
        properties.setProperty(MysqlExportService.TEMP_DIR, new File("external").getPath());

        MysqlExportService mysqlExportService = new MysqlExportService(properties);
        mysqlExportService.export();
    }
}
