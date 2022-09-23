package com.example.squadmap.data.model

data class StoreInfo(
    val title: String,
    val category: CategoryInfo,
    val address: String,
    val lat: Double,
    val long: Double,
    val description: String,
    val link: String
)
