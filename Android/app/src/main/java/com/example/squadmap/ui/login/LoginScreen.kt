package com.example.squadmap.ui.login

import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.compose.rememberNavController
import com.example.squadmap.R
import com.example.squadmap.common.logger
import com.example.squadmap.ui.TopAppbar
import com.example.squadmap.ui.common.navigation.SquadMapNavigation
import com.example.squadmap.ui.common.navigation.SquadMapRoutAction
import com.example.squadmap.ui.theme.Main
import com.example.squadmap.ui.theme.SquadMapTheme

@Composable
fun LoginScreen(routAction: SquadMapRoutAction) {
    Scaffold(
        topBar = {
            TopAppbar(
                routAction = routAction,
                title = "Login",
                isSearchVisible = false,
                isAddVisible = false
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .padding(padding)
                .fillMaxWidth()
                .height(700.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "Squad Map",
                fontSize = 50.sp,
                fontWeight = FontWeight.Bold,
                color = Color(Main.value)
            )
            Text(
                text = "소셜 로그인",
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.height(20.dp))
            LoginButton(
                title = "네이버 로그인",
                color = Color.Green,
                icon = painterResource(id = R.drawable.ic_naver_logo),
                contentDescription = "never login",
                iconTint = Color.White,
                fontColor = Color.White,
            ) {
                logger("never login")
            }
            Spacer(modifier = Modifier.height(10.dp))
            LoginButton(
                title = "깃헙 로그인",
                color = Color.Black,
                icon = painterResource(id = R.drawable.ic_github_logo_com),
                contentDescription = "github login",
                iconTint = Color.White,
                fontColor = Color.White,
            ) {
                routAction.navToRout(SquadMapNavigation.GITHUB_LOGIN)
            }
        }
    }
}

@Composable
private fun LoginButton(
    title: String,
    color: Color,
    icon: Painter? = null,
    contentDescription: String = "",
    iconTint: Color = Color.Transparent,
    fontColor: Color,
    onClick: () -> Unit
) {
    Button(
        onClick = {
            onClick()
        },
        modifier = Modifier.width(190.dp),
        colors = ButtonDefaults.buttonColors(color)
    ) {
        Row(
            horizontalArrangement = Arrangement.Center
        ){
            icon?.let {
                Icon(
                    painter = icon,
                    contentDescription = contentDescription,
                    tint = iconTint,
                    modifier = Modifier.padding(end = 10.dp)
                )
            }

            Text(
                text = title,
                color = fontColor,
                fontSize = 12.sp,
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(top = 3.dp)
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    SquadMapTheme {
        LoginScreen(SquadMapRoutAction(rememberNavController()))
    }
}