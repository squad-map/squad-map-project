package com.squadmap.common.auth.application;

import com.squadmap.common.properties.JwtProperties;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtProvider {

    private final JwtProperties jwtProperties;
    private final SecretKey secretKey;
    private final JwtParser jwtParser;

    public JwtProvider(JwtProperties jwtProperties) {
        this.jwtProperties = jwtProperties;
        this.secretKey = Keys.hmacShaKeyFor(jwtProperties.getSecretKey()
                .getBytes(StandardCharsets.UTF_8));
        this.jwtParser = Jwts.parserBuilder()
                .requireIssuer(jwtProperties.getIssuer())
                .setSigningKey(secretKey)
                .build();
    }

    public String generateAccessToken(Long memberId) {
        return generateToken(memberId,
                jwtProperties.getAccessTokenSubject(),
                jwtProperties.getAccessExpireTime());
    }

    public String generateRefreshToken(Long memberId) {
        return generateToken(memberId,
                jwtProperties.getRefreshTokenSubject(),
                jwtProperties.getRefreshExpireTime());
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = jwtParser.parseClaimsJws(token);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public String getAudience(String token) {
        return jwtParser.parseClaimsJws(token).getBody().getAudience();
    }

    private String generateToken(Long memberId, String subject, Long expireTime) {
        long now = System.currentTimeMillis();
        Date expiration = new Date(now + expireTime);

        return Jwts.builder()
                .setIssuer(jwtProperties.getIssuer())
                .setSubject(subject)
                .setAudience(String.valueOf(memberId))
                .setExpiration(expiration)
                .signWith(secretKey)
                .compact();
    }
}
