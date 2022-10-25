package com.example.squadmap.ui.profile

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.squadmap.data.dto.Nickname
import com.example.squadmap.data.repository.LoginRepository
import com.example.squadmap.data.repository.ProfileRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.channels.BufferOverflow
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ProfileViewModel @Inject constructor(
    private val profileRepository: ProfileRepository,
    private val loginRepository: LoginRepository
): ViewModel() {

    val nickname = MutableStateFlow("")

    private val _error = MutableSharedFlow<String>()
    val error = _error.asSharedFlow()

    fun updateNickname() {
        viewModelScope.launch {
            kotlin.runCatching {
                profileRepository.update(
                    Nickname(
                        nickname.value
                    )
                )
            }.onFailure {
                _error.emit(it.message.orEmpty())
            }.onSuccess {
                loginRepository.setNickname(it.nickname)
            }
        }
    }

    fun updateAppSession(nickname: String) {
        loginRepository.setNickname(nickname)
    }

    fun isLogin() = loginRepository.isLogin()

}