package com.uade.tpo.demo.controllers.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;



import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

        private final JwtAuthenticationFilter jwtAuthFilter;
        private final AuthenticationProvider authenticationProvider;

@Bean
SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .csrf(AbstractHttpConfigurer::disable)
                                .authorizeHttpRequests(req -> req.requestMatchers("/api/v1/auth/**").permitAll()
                                                .requestMatchers("/error/**").permitAll()
                                                .requestMatchers(HttpMethod.POST, "/categories").hasRole("ADMIN")
                                                .requestMatchers(HttpMethod.DELETE, "/categories").hasRole("ADMIN")
                                                .requestMatchers(HttpMethod.PUT, "/categories").hasRole("ADMIN")
                                                .requestMatchers(HttpMethod.POST, "/pedidos").hasRole("ADMIN")
                                                .requestMatchers(HttpMethod.DELETE, "/pedidos/**").hasRole("ADMIN")
                                                .requestMatchers(HttpMethod.PUT, "/pedidos/**").hasRole("ADMIN")
                                                .requestMatchers(HttpMethod.GET, "/users/**").hasRole("ADMIN")
                                                .requestMatchers(HttpMethod.PUT, "/users/**").hasRole("ADMIN")
                                                .requestMatchers(HttpMethod.DELETE, "/users/**").hasRole("ADMIN")
                                                .requestMatchers(HttpMethod.POST, "/vehicles").hasAnyRole("ADMIN")
                                                .requestMatchers(HttpMethod.PUT, "/vehicles/**").hasAnyRole("ADMIN")
                                                .requestMatchers(HttpMethod.DELETE, "/vehicles/**").hasAnyRole("ADMIN")
                                                .anyRequest().authenticated())
                                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                                .authenticationProvider(authenticationProvider)
                                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }
}
