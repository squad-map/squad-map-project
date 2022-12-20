package com.squadmap.assured;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.squadmap.IsolationTestExecutionListener;
import com.squadmap.common.auth.application.JwtProvider;
import io.restassured.RestAssured;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.config.ObjectMapperConfig;
import io.restassured.config.RestAssuredConfig;
import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpHeaders;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.snippet.Snippet;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestExecutionListeners;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.restassured3.RestAssuredRestDocumentation.documentationConfiguration;


@TestExecutionListeners(value = IsolationTestExecutionListener.class, mergeMode = TestExecutionListeners.MergeMode.MERGE_WITH_DEFAULTS)
@ActiveProfiles("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ExtendWith(RestDocumentationExtension.class)
public class RestAssuredTest {

    protected static final String DEFAULT_RESTDOC_PATH = "{class_name}/{method_name}";

    protected static final Snippet AUTHORIZATION_HEADER = requestHeaders(
            headerWithName(HttpHeaders.AUTHORIZATION).description("토큰, 로그인 및 권한 검증"));

    protected static final List<FieldDescriptor> COMMON_RESPONSE_FIELDS = List.of(
            fieldWithPath("code").type(JsonFieldType.STRING).description("응답 커스텀 코드"),
            fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
            fieldWithPath("data").description("응답 데이터")
    );

    protected static final Snippet COMMON_RESPONSE_EMPTY_DATA = responseFields(COMMON_RESPONSE_FIELDS);

    public static final Snippet MAP_PATH_PARAMETER = pathParameters(
            parameterWithName("map_id").description("지도의 아이디")
    );

    protected RequestSpecification specification;

    @Autowired
    protected JwtProvider jwtProvider;

    @LocalServerPort
    int port;

    protected static String makeFieldName(String name) {
        return "data." + name;
    }


    protected static Snippet generateCommonResponse(FieldDescriptor... descriptors) {
        List<FieldDescriptor> fieldDescriptors = new ArrayList<>();
        fieldDescriptors.addAll(COMMON_RESPONSE_FIELDS);
        fieldDescriptors.addAll(Arrays.asList(descriptors));
        return responseFields(fieldDescriptors);
    }

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @BeforeEach
    void setUpRestDocs(RestDocumentationContextProvider restDocs) {

        RestAssuredConfig restAssuredConfig = new RestAssuredConfig()
                .objectMapperConfig(new ObjectMapperConfig()
                .jackson2ObjectMapperFactory(
                        (cls, charset) -> new ObjectMapper().setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE))
        );

        this.specification = new RequestSpecBuilder()
                .setConfig(restAssuredConfig)
                .setPort(port)
                .addFilter(documentationConfiguration(restDocs)
                        .operationPreprocessors()
                        .withRequestDefaults(prettyPrint())
                        .withResponseDefaults(prettyPrint())
                )
                .build();
    }

    protected String createAuthorizationHeader(Long memberId) {
        return "Bearer " + this.jwtProvider.generateAccessToken(memberId);
    }



}
