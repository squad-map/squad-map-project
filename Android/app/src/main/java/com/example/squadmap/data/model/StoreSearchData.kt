package com.example.squadmap.data.model

data class StoreSearchData(
    val items: List<ResultStore>,
    val start: Int,
    val total: Int
)

data class ResultStore(
    val address: String,
    val category: String,
    val description: String,
    val link: String,
    val roadAddress: String,
    val telephone: String,
    val title: String
)
