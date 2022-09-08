package com.example.squadmap.ui

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Color.Companion.Gray
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.compose.rememberNavController
import com.example.squadmap.common.AppSession
import com.example.squadmap.data.model.JWT
import com.example.squadmap.ui.bottommenu.BottomNavigation
import com.example.squadmap.ui.bottommenu.BottomNavigationBar
import com.example.squadmap.ui.bottommenu.BottomNavigationGraph
import com.example.squadmap.ui.theme.SquadMapTheme
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
                    Greeting("Android", appSession.jwt)
                }
            }
        }
    }
}



@Composable
fun Greeting(name: String, jwt: JWT?) {
    val navController = rememberNavController()
    Scaffold(
        bottomBar = { BottomNavigationBar(navController = navController) }
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
        Greeting("Android", null)
    }
}