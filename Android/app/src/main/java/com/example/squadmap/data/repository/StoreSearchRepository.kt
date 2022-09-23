package com.example.squadmap.data.repository

import com.example.squadmap.data.model.StoreSearchData

interface StoreSearchRepository {
    suspend fun getSearchResult(query: String, display: Int = 5, start: Int): StoreSearchData
}