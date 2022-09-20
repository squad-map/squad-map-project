package com.example.squadmap.ui.map

import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import com.example.squadmap.data.model.CategoryInfo
import com.example.squadmap.data.model.MapInfo
import com.example.squadmap.data.model.StoreInfo
import com.naver.maps.geometry.LatLng
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
            "맛있는카페"
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
            "맛있는카페"
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
            "맛있는카페"
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
            "맛있는카페"
        )
    )

    val mapInfo = MapInfo(
        "Muffine",
        list
    )

    val cameraLatLongState = mutableStateOf(LatLng(mapInfo.store[0].lat, mapInfo.store[0].long))

}