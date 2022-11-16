package com.squadmap;

import org.springframework.test.context.TestContext;
import org.springframework.test.context.support.AbstractTestExecutionListener;

public class IsolationTestExecutionListener extends AbstractTestExecutionListener {

    private DbConfigurator dbConfigurator;

    @Override
    public void prepareTestInstance(TestContext testContext) throws Exception {
       this.dbConfigurator = getDbConfigurator(testContext);
    }

    @Override
    public void beforeTestMethod(TestContext testContext) throws Exception {
        dbConfigurator.setUp();
    }

    @Override
    public void afterTestMethod(TestContext testContext) throws Exception {
        //getDbConfigurator(testContext).cleanUp();
    }

    private DbConfigurator getDbConfigurator(TestContext testContext) {
        return testContext.getApplicationContext().getBean(DbConfigurator.class);
    }

}
