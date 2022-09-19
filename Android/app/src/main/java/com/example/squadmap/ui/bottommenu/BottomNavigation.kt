package com.example.squadmap.ui.bottommenu

import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.material.BottomNavigationItem
import androidx.compose.material.Icon
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.example.squadmap.data.model.JWT
import com.example.squadmap.ui.category.CategoryMapScreen
import com.example.squadmap.ui.home.HomeScreen
import com.example.squadmap.ui.login.LoginScreen
import com.example.squadmap.ui.mymap.MyMapScreen
import com.example.squadmap.ui.navigation.SquadMapNavGraph
import com.example.squadmap.ui.profile.ProfileScreen
import com.example.squadmap.ui.theme.SquadMapTheme

val items = listOf<BottomNavigation>(
    BottomNavigation.Home,
//    BottomNavigation.Category,
    BottomNavigation.MyMap,
    BottomNavigation.Profile
)

@Composable
fun BottomNavigationGraph(navController: NavHostController, jwt: JWT?) {
    NavHost(
        navController = navController,
        startDestination = BottomNavigation.Home.screenRoute,
        modifier = Modifier
    ) {
        composable(BottomNavigation.Home.screenRoute) {
            SquadMapNavGraph()
        }
//        composable(BottomNavigation.Category.screenRoute) {
//            CategoryMapScreen()
//        }
        composable(BottomNavigation.MyMap.screenRoute) {
            if (jwt != null) {
                MyMapScreen()
            } else {
                LoginScreen()
            }
        }
        composable(BottomNavigation.Profile.screenRoute) {
            if (jwt != null) {
                ProfileScreen()
            } else {
                LoginScreen()
            }
        }
    }
}

@Composable
fun BottomNavigationBar(navController: NavHostController) {

    androidx.compose.material.BottomNavigation(
        backgroundColor = Color.White,
        contentColor = Color(0xFF3F414E),
    ) {
        val navBackStackEntry by navController.currentBackStackEntryAsState()
        val currentRoute = navBackStackEntry?.destination?.route

        items.forEach { item ->
            BottomNavigationItem(
                icon = {
                    Icon(
                        painter = painterResource(id = item.icon),
                        contentDescription = stringResource(id = item.title),
                        modifier = Modifier
                            .width(26.dp)
                            .height(26.dp)
                    )
                },
                label = { Text(stringResource(id = item.title), fontSize = 9.sp) },
                selectedContentColor = MaterialTheme.colors.primary,
                unselectedContentColor = Color.Gray,
                selected = currentRoute == item.screenRoute,
                alwaysShowLabel = false,
                onClick = {
                    navController.navigate(item.screenRoute) {
                        navController.graph.startDestinationRoute?.let {
                            popUpTo(it) { saveState = true }
                        }
                        launchSingleTop = true
                        restoreState = true
                    }
                }
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    SquadMapTheme {

    }
}