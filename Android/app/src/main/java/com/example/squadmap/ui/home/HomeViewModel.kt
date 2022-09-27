package com.example.squadmap.ui.home

import androidx.compose.runtime.MutableState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import com.example.squadmap.data.model.AllMap
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class HomeViewModel @Inject constructor(

):ViewModel() {
    private val mapList = listOf<AllMap>(
        AllMap("1F389", "스쿼드 지도", "로니", 6),
        AllMap("1F389", "스쿼드 지도", "로니", 6),
        AllMap("1F389", "스쿼드 지도", "로니", 6),
        AllMap("1F389", "스쿼드 지도", "로니", 6),
        AllMap("1F389", "스쿼드 지도", "로니", 6),
        AllMap("1F389", "스쿼드 지도", "로니", 6),
        AllMap("1F389", "스쿼드 지도", "로니", 6),
        AllMap("1F389", "스쿼드 지도", "로니", 6),
        AllMap("1F389", "스쿼드 지도", "로니", 6),
        AllMap("1F389", "스쿼드 지도", "로니", 6)
    )

    private val groupMapList = listOf<AllMap>(
        AllMap("1F389", "스쿼드 지도", "머핀", 6),
        AllMap("1F389", "스쿼드 지도", "퍼니", 6),
    )

    val selectedTypeState: MutableState<MapType?> = mutableStateOf(MapType.OPEN)

    val mapListState = mutableStateOf(mapList)

    fun getMapList(selectedType: MapType?) = when(selectedType) {
        MapType.GROUP -> {
            groupMapList
        }
        else -> {
            mapList
        }
    }
}