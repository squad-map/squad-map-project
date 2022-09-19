package com.example.squadmap.ui.bottommenu

import com.example.squadmap.R
import com.example.squadmap.ui.navigation.SquadMapNavigation

sealed class BottomNavigation(
    val title: Int, val icon: Int, val screenRoute: String
) {
    object Home: BottomNavigation(R.string.Home, R.drawable.ic_home, SquadMapNavigation.HOME.route)
//    object Category: BottomNavigation(R.string.category, R.drawable.ic_category, CATEGORY)
    object MyMap: BottomNavigation(R.string.mymap, R.drawable.ic_my_map, SquadMapNavigation.MY_MAP.route)
    object Profile: BottomNavigation(R.string.profile, R.drawable.ic_profile, SquadMapNavigation.PROFILE.route)
}