package com.matan.coin;

import com.google.firebase.auth.FirebaseAuth;

import org.junit.Test;

import static org.junit.Assert.*;

public class BoardTest {

    @Test
    public void onCreate() {
        assertNotNull(FirebaseAuth.getInstance().getCurrentUser());
    }
}