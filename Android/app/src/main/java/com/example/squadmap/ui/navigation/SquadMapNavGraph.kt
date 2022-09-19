package com.example.squadmap.ui.navigation

import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.squadmap.ui.home.HomeScreen
import com.example.squadmap.ui.search.SearchScreen
import com.example.squadmap.ui.store.StoreListView
import com.example.squadmap.ui.web.StoreWebView

@Composable
fun SquadMapNavGraph(startRoute: String = SquadMapNavigation.HOME.route) {
    val navController = rememberNavController()
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

        }
        composable(SquadMapNavigation.WEB.route) {
            StoreWebView()
        }
    }
}