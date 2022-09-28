package com.example.squadmap.data.model

//data class StoreSearchData(
//    val items: List<ResultStore>,
//    val start: Int,
//    val total: Int
//)

data class StoreSearchData(
    val address: String,
    val category: String,
    val link: String,
    val roadAddress: String,
    val telephone: String,
    val name: String,
    val x: Double,
    val y: Double
)
