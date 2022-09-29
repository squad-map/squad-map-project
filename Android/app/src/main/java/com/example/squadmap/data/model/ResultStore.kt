package com.example.squadmap.data.model

data class StoreSearchData(
    val items: List<ResultStore>,
    val isEnd: Boolean,
)

data class ResultStore(
    val address: String,
    val category: String,
    val link: String,
    val roadAddress: String,
    val telephone: String,
    val name: String,
    val x: Double,
    val y: Double
)
