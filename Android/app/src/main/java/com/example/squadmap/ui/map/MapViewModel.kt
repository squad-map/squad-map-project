package com.example.squadmap.ui.map

import android.content.Context
import androidx.compose.runtime.State
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import com.example.squadmap.data.model.CategoryInfo
import com.example.squadmap.data.model.MapInfo
import com.example.squadmap.data.model.StoreInfo
import com.example.squadmap.ui.common.UiState
import dagger.hilt.android.lifecycle.HiltViewModel
import net.daum.mf.map.api.MapPOIItem
import net.daum.mf.map.api.MapPoint
import net.daum.mf.map.api.MapView
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

    private val categories = listOf(
        CategoryInfo(
            "카페",
            "#ff0000",
            "카페"
        ),
        CategoryInfo(
            "카페",
            "#ff3388",
            "식당"
        )
    )
    val mapInfo = MapInfo(
        "Muffine",
        list,
        categories
    )

    var mapViewState = mutableStateOf<UiState<MapView>>(UiState.Loading)

    fun setMapView(context: Context): MapView {
        val mapView = MapView(context)
        mapViewState.value = UiState.Success(mapView)
        setMarker()
        return mapView
    }

    private fun setMarker() {
        list.forEach {
            val marker = MapPOIItem()
            marker.itemName = it.title
            marker.tag = 0
            marker.mapPoint = MapPoint.mapPointWithGeoCoord(it.lat, it.long)
            marker.markerType = MapPOIItem.MarkerType.BluePin // 기본으로 제공하는 BluePin 마커 모양.
            marker.selectedMarkerType = MapPOIItem.MarkerType.RedPin // 마커를 클릭했을때, 기본으로 제공하는 RedPin 마커 모양.

            mapViewState.value._data?.addPOIItem(marker)
        }
    }

    fun setPoint(lat: Double, long: Double) {
        mapViewState.value._data?.setMapCenterPoint(
            MapPoint.mapPointWithGeoCoord(
                lat,
                long
            ), true
        )
    }

}