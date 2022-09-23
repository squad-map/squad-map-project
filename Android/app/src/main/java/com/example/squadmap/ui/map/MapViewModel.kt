package com.example.squadmap.ui.map

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.lifecycle.ViewModel
import com.example.squadmap.data.model.CategoryInfo
import com.example.squadmap.data.model.MapInfo
import com.example.squadmap.data.model.StoreInfo
import com.naver.maps.geometry.LatLng
import com.naver.maps.map.CameraPosition
import com.naver.maps.map.compose.CameraPositionState
import com.naver.maps.map.compose.MapUiSettings
import com.naver.maps.map.compose.rememberCameraPositionState
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class MapViewModel @Inject constructor(): ViewModel() {

    private val list = listOf(
        StoreInfo(
            "테일러커피",
            CategoryInfo(
                "카페",
                "#ff0000",
                "카페"
            ),
            "서울 마포구 잔다리로",
            37.632600,
            127.024612,
            "맛있는카페",
            "https://map.naver.com/v5/search/%ED%85%8C%EC%9D%BC%EB%9F%AC%20%EC%BB%A4%ED%94%BC/place/35848993?placePath=%3Fentry=pll%26from=nx%26fromNxList=true&c=14128591.3474239,4516590.1649631,15,0,0,0,dh"
        ),
        StoreInfo(
            "테일러커피",
            CategoryInfo(
                "카페",
                "#ff0000",
                "카페"
            ),
            "서울 마포구 잔다리로",
            37.522600,
            127.024612,
            "맛있는카페",
            "https://map.naver.com/v5/search/%ED%85%8C%EC%9D%BC%EB%9F%AC%20%EC%BB%A4%ED%94%BC/place/35848993?placePath=%3Fentry=pll%26from=nx%26fromNxList=true&c=14128591.3474239,4516590.1649631,15,0,0,0,dh"
        ),
        StoreInfo(
            "테일러커피",
            CategoryInfo(
                "카페",
                "#ff0000",
                "카페"
            ),
            "서울 마포구 잔다리로",
            36.532600,
            126.024612,
            "맛있는카페",
            "https://map.naver.com/v5/search/%ED%85%8C%EC%9D%BC%EB%9F%AC%20%EC%BB%A4%ED%94%BC/place/35848993?placePath=%3Fentry=pll%26from=nx%26fromNxList=true&c=14128591.3474239,4516590.1649631,15,0,0,0,dh"
        ),
        StoreInfo(
            "테일러커피",
            CategoryInfo(
                "카페",
                "#ff0000",
                "카페"
            ),
            "서울 마포구 잔다리로",
            37.532600,
            127.124612,
            "맛있는카페",
            "https://map.naver.com/v5/search/%ED%85%8C%EC%9D%BC%EB%9F%AC%20%EC%BB%A4%ED%94%BC/place/35848993?placePath=%3Fentry=pll%26from=nx%26fromNxList=true&c=14128591.3474239,4516590.1649631,15,0,0,0,dh"
        )
    )

    val mapInfo = MapInfo(
        "Muffine",
        list
    )

    val mapUiSettings by mutableStateOf(
        MapUiSettings(
                isLocationButtonEnabled = false
            )
        )

    val cameraLatLongState = mutableStateOf(LatLng(mapInfo.store[0].lat, mapInfo.store[0].long))

}