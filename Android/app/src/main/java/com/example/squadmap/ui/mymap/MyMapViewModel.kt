package com.example.squadmap.ui.mymap

import androidx.lifecycle.ViewModel
import com.example.squadmap.data.repository.LoginRepository
import com.example.squadmap.data.repository.MyMapRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class MyMapViewModel @Inject constructor(
    private val myMapRepository: MyMapRepository,
    private val loginRepository: LoginRepository
): ViewModel() {

    fun isLogin() = loginRepository.isLogin()

}