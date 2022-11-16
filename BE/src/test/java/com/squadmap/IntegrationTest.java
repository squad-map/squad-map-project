package com.squadmap;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestExecutionListeners;

@TestExecutionListeners(value = IsolationTestExecutionListener.class, mergeMode = TestExecutionListeners.MergeMode.MERGE_WITH_DEFAULTS)
@SpringBootTest
@ActiveProfiles("test")
public abstract class IntegrationTest {

    @Autowired
    private DbConfigurator dbConfigurator;

    @BeforeEach
    void setUp() {
        //dbConfigurator.setUp();
    }







}
