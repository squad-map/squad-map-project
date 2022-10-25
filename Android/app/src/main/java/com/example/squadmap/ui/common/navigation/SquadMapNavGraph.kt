package com.example.squadmap.ui.common.navigation

import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import com.example.squadmap.common.logger
import com.example.squadmap.data.model.JWT
import com.example.squadmap.ui.common.bottommenu.BottomNavigation
import com.example.squadmap.ui.home.HomeScreen
import com.example.squadmap.ui.login.LoginScreen
import com.example.squadmap.ui.map.MapViewModel
import com.example.squadmap.ui.map.StoreMapScreen
import com.example.squadmap.ui.mymap.MyMapScreen
import com.example.squadmap.ui.profile.ProfileScreen
import com.example.squadmap.ui.search.SearchScreen
import com.example.squadmap.ui.map.store.StoreListView
import com.example.squadmap.ui.addstore.AddStoreViewModel
import com.example.squadmap.ui.addstore.StoreDescriptionScreen
import com.example.squadmap.ui.addstore.StoreSearchScreen
import com.example.squadmap.ui.home.HomeViewModel
import com.example.squadmap.ui.mymap.MyMapViewModel
import com.example.squadmap.ui.profile.ProfileViewModel
import com.example.squadmap.ui.web.LoginViewModel
import com.example.squadmap.ui.web.OAuthLoginWebView
import com.example.squadmap.ui.web.StoreWebView

@Composable
fun SquadMapNavGraph(
    navController: NavHostController,
    startRoute: String = BottomNavigation.Home.screenRoute,
    jwt: JWT?
) {
    val routeAction = remember(navController) {
        SquadMapRoutAction(navController)
    }
    NavHost(navController = navController, startDestination = startRoute) {
        composable(SquadMapNavigation.HOME.route) {
            val viewModel = hiltViewModel<HomeViewModel>()
            HomeScreen(routeAction, viewModel)
        }
        composable(SquadMapNavigation.SEARCH_SCREEN.route) {
            SearchScreen()
        }
        composable(SquadMapNavigation.STORE_LIST.route) {
            val mapViewModel = hiltViewModel<MapViewModel>(
                navController.getBackStackEntry(startRoute)
            )
            StoreListView(routAction = routeAction, mapViewModel = mapViewModel)
        }
        composable(SquadMapNavigation.MAP_VIEW.route) {
            val mapViewModel = hiltViewModel<MapViewModel>(
                navController.getBackStackEntry(startRoute)
            )
            StoreMapScreen(routAction = routeAction, mapViewModel = mapViewModel)
        }
        composable(
            route = "${SquadMapNavigation.WEB.route}/{url}",
            arguments = listOf(
                navArgument("url") {
                    type = NavType.StringType
                }
            )
        ) { backStackEntry ->
            val url = backStackEntry.arguments?.getString("url").orEmpty()
            StoreWebView(url)
        }
        composable(
            route = "${SquadMapNavigation.OAUTH_LOGIN.route}/{url}/{state}",
            arguments = listOf(
                navArgument("url") {
                    type = NavType.StringType
                },
                navArgument("state") {
                    type = NavType.StringType
                }
            )
        ) { backStackEntry ->
            val url = backStackEntry.arguments?.getString("url").orEmpty()
            val state = backStackEntry.arguments?.getString("state")
            val viewModel = hiltViewModel<LoginViewModel>()

            OAuthLoginWebView(
                viewModel = viewModel,
                move = {
                    routeAction.navToRout(SquadMapNavigation.PROFILE)
                },
                url = url,
                state = state
            )

        }
        composable(SquadMapNavigation.SEARCH_STORE_FOR_ADD.route) { backStackEntry ->
            val viewModel: AddStoreViewModel = hiltViewModel(backStackEntry)
            StoreSearchScreen(routAction = routeAction, viewModel = viewModel)
        }
        composable(SquadMapNavigation.ADD_STORE_DESCRIPTION.route) { backStackEntry ->
            val viewModel: AddStoreViewModel = hiltViewModel(backStackEntry)
            StoreDescriptionScreen(routAction = routeAction, viewModel = viewModel)
        }
        composable(BottomNavigation.MyMap.screenRoute) {
            val viewModel: MyMapViewModel = hiltViewModel(it)
            MyMapScreen(
                myMapViewModel = viewModel,
                routAction = routeAction
            )
        }
        composable(BottomNavigation.Profile.screenRoute) {
            val viewModel: ProfileViewModel = hiltViewModel()
            ProfileScreen(
                profileViewModel = viewModel,
                routAction = routeAction
            )
        }
        composable(SquadMapNavigation.LOGIN.route) {
            logger("LOGIN")
            LoginScreen(routeAction)
        }
    }
}