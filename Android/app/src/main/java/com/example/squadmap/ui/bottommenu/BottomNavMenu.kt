package com.example.squadmap.ui.bottommenu

import com.example.squadmap.R

const val HOME = "HOME"
const val CATEGORY = "CATEGORY"
const val MY_MAP = "MY_MAP"
const val PROFILE = "PROFILE"

sealed class BottomNavigation(
    val title: Int, val icon: Int, val screenRoute: String
) {
    object Home: BottomNavigation(R.string.Home, R.drawable.ic_home, HOME)
//    object Category: BottomNavigation(R.string.category, R.drawable.ic_category, CATEGORY)
    object MyMap: BottomNavigation(R.string.mymap, R.drawable.ic_my_map, MY_MAP)
    object Profile: BottomNavigation(R.string.profile, R.drawable.ic_profile, PROFILE)
}