package com.example.squadmap.ui.map

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import com.example.squadmap.ui.navigation.SquadMapRoutAction
import com.naver.maps.geometry.LatLng
import com.naver.maps.map.CameraPosition
import com.naver.maps.map.compose.*

@OptIn(ExperimentalNaverMapApi::class)
@Composable
fun StoreMapScreen(
    routAction: SquadMapRoutAction
) {
    var mapUiSettings by remember {
        mutableStateOf(
            MapUiSettings(isLocationButtonEnabled = true)
        )
    }
    val seoul = LatLng(37.532600, 127.024612)
    val cameraPositionState: CameraPositionState = rememberCameraPositionState {
        // 카메라 초기 위치를 설정합니다.
        position = CameraPosition(seoul, 11.0)
    }
    Box {
        NaverMap(
            uiSettings = mapUiSettings,
            modifier = Modifier.fillMaxSize(),
            cameraPositionState = cameraPositionState
        )
    }
}