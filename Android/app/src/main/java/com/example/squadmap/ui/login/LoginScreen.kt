package com.example.squadmap.ui.login

import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.compose.rememberNavController
import com.example.squadmap.ui.navigation.SquadMapNavigation
import com.example.squadmap.ui.navigation.SquadMapRoutAction
import com.example.squadmap.ui.theme.Main
import com.example.squadmap.ui.theme.SquadMapTheme

@Composable
fun LoginScreen(routAction: SquadMapRoutAction) {
    Scaffold(
        topBar = {
            TopAppbar()
        }
    ) { padding ->
        Column(modifier = Modifier
            .padding(padding)
            .fillMaxWidth()
            .height(700.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "로그인",
                fontSize = 50.sp,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.height(20.dp))
            NaverLoginButton(routAction)
            Spacer(modifier = Modifier.height(10.dp))
            GithubLoginButton(routAction)
        }
    }
}

@Composable
private fun NaverLoginButton(routAction: SquadMapRoutAction) {
    Button(
        onClick = { /*TODO*/ },
        modifier = Modifier.width(160.dp),
        colors = ButtonDefaults.buttonColors(Color.Green)
    ) {
        Text(
            text = "Naver",
            color = Color.White
        )
    }
}

@Composable
private fun GithubLoginButton(routAction: SquadMapRoutAction) {
    Button(
        onClick = {
                  routAction.navToRout(SquadMapNavigation.GITHUB_LOGIN)
        },
        modifier = Modifier.width(160.dp),
        colors = ButtonDefaults.buttonColors(Color.Black)
    ) {
        Text(
            text = "Github",
            color = Color.White
        )
    }
}

@Composable
private fun TopAppbar() {
    TopAppBar(
        elevation = 4.dp,
        title = {
            Text("Login")
        },
        backgroundColor =  Main,
        navigationIcon = {
            IconButton(onClick = {/* Do Something*/ }) {
                Icon(Icons.Filled.ArrowBack, null)
            }
        }
    )
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    SquadMapTheme {
        LoginScreen(SquadMapRoutAction(rememberNavController()))
    }
}