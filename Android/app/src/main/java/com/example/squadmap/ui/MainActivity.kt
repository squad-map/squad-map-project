package com.example.squadmap.ui

import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.example.squadmap.common.AppSession
import com.example.squadmap.data.model.JWT
import com.example.squadmap.ui.bottommenu.*
import com.example.squadmap.ui.login.LoginScreen
import com.example.squadmap.ui.navigation.SquadMapNavigation
import com.example.squadmap.ui.navigation.SquadMapRoutAction
import com.example.squadmap.ui.theme.SquadMapTheme
import com.example.squadmap.ui.utils.logger
import dagger.hilt.android.AndroidEntryPoint
import javax.inject.Inject

@AndroidEntryPoint
class MainActivity : ComponentActivity() {

    @Inject lateinit var appSession: AppSession

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            SquadMapTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colors.background
                ) {
                    SquadMapApp(appSession.jwt)
                }
            }
        }
    }
}



@Composable
fun SquadMapApp(jwt: JWT?) {
    val navController = rememberNavController()
    Scaffold(
        bottomBar = {
            val navBackStackEntry by navController.currentBackStackEntryAsState()
            when(navBackStackEntry?.destination?.route) {
                HOME, MY_MAP, PROFILE -> {
                    BottomNavigationBar(navController = navController)
                }
            }
        }
    ) {
        Box(Modifier.padding(it)){
            BottomNavigationGraph(navController = navController, jwt)
        }
    }
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    SquadMapTheme {
        SquadMapApp(null)
    }
}