package com.squadmap;

import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

@Component
public class DbConfigurator implements InitializingBean {

    private static final Logger log = LoggerFactory.getLogger(DbConfigurator.class);
    private static final String DATA_FILE_NAME = "data-script.sql";

    @PersistenceContext
    private EntityManager entityManager;

    private List<String> tableNames;

    @Override
    public void afterPropertiesSet() throws Exception {
        entityManager.unwrap(Session.class).doWork(this::getTableNames);
        log.info("Init DbConfigurator");
    }


    private void getTableNames(Connection connection) throws SQLException {
        List<String> tableNames = new ArrayList<>();

        ResultSet tables = connection.getMetaData()
                .getTables(connection.getCatalog(), null, "%", new String[]{"TABLE"});

        try (tables) {
            while(tables.next()) {
                tableNames.add(tables.getString("table_name"));
            };
        }
        this.tableNames = tableNames;
    }

    public void setUp() {
        entityManager.unwrap(Session.class)
                .doWork(connection ->  {
                    this.cleanUpData(connection, tableNames);
                    this.insertData(connection, DATA_FILE_NAME);
                });
    }

    public void cleanUp() {
        entityManager.unwrap(Session.class)
                .doWork(connection ->  {
                    this.cleanUpData(connection, tableNames);
                });
    }

    public void setData() {
        entityManager.unwrap(Session.class)
                .doWork(connection ->  {
                    this.insertData(connection, DATA_FILE_NAME);
                });
    }



    private void cleanUpData(Connection connection, List<String> tableNames) throws SQLException {
        try (Statement statement = connection.createStatement()) {

            statement.executeUpdate("SET FOREIGN_KEY_CHECKS = 0");

            for (String tableName : tableNames) {
                statement.executeUpdate("TRUNCATE TABLE " + tableName);
            }

            statement.executeUpdate("SET FOREIGN_KEY_CHECKS = 1");
        }
    }

    private void insertData(Connection connection, String filePath) {
        ResourceDatabasePopulator resourceDatabasePopulator = new ResourceDatabasePopulator();
        ClassPathResource classPathResource = new ClassPathResource(filePath);
        resourceDatabasePopulator.addScript(classPathResource);
        resourceDatabasePopulator.populate(connection);
    }

}
