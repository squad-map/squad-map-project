package com.example.squadmap.ui.addstore

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import com.example.squadmap.common.logger
import com.example.squadmap.data.repository.StoreSearchRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class AddStoreViewModel @Inject constructor(
    private val storeSearchRepository: StoreSearchRepository
): ViewModel() {

    private val _query = mutableStateOf("")
    val query: State<String> = _query

    private val

    fun updateQuery(newValue: String) {
        _query.value = newValue
        logger(newValue)
    }

    fun
}


