package com.example.squadmap.ui.navigation

import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.example.squadmap.data.model.JWT
import com.example.squadmap.ui.bottommenu.BottomNavigation
import com.example.squadmap.ui.home.HomeScreen
import com.example.squadmap.ui.login.LoginScreen
import com.example.squadmap.ui.map.StoreMapScreen
import com.example.squadmap.ui.mymap.MyMapScreen
import com.example.squadmap.ui.profile.ProfileScreen
import com.example.squadmap.ui.search.SearchScreen
import com.example.squadmap.ui.store.StoreListView
import com.example.squadmap.ui.web.StoreWebView

@Composable
fun SquadMapNavGraph(navController: NavHostController, startRoute: String = BottomNavigation.Home.screenRoute, jwt: JWT?) {
    val routeAction = remember(navController) {
        SquadMapRoutAction(navController)
    }
    NavHost(navController = navController, startDestination = startRoute) {
        composable(SquadMapNavigation.HOME.route) {
            HomeScreen(routeAction)
        }
        composable(SquadMapNavigation.SEARCH_SCREEN.route) {
            SearchScreen()
        }
        composable(SquadMapNavigation.STORE_LIST.route) {
            StoreListView(routAction = routeAction)
        }
        composable(SquadMapNavigation.MAP_VIEW.route) {
            StoreMapScreen(routAction = routeAction)
        }
        composable(SquadMapNavigation.WEB.route) {
            StoreWebView()
        }
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