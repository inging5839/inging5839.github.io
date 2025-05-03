function toggleClockDropdown(dropdownId) {
    const clockDropdown = document.getElementById(dropdownId);
    if (clockDropdown.style.display === 'block') {
        clockDropdown.style.display = 'none';
    } else {
        clockDropdown.style.display = 'block';
    }
}

document.getElementById('logoContainer').addEventListener('click', () => {
    window.location.href = 'index.html';
});


function toggleCheckBox(element) {
    const checkBox = element.querySelector('.checkbox');
    const text = element.querySelector('.checkbox-text');
    if (checkBox.src.includes('checkBox.svg')) {
        checkBox.src = 'static//icon/checkedBox.svg';
        text.style.textDecoration = 'line-through';
    } else {
        checkBox.src = 'static//icon/checkBox.svg';
        text.style.textDecoration = 'none';
    }
}

function toggleBeam(element) {
    const beam = element.querySelector('.beamOnOFF');
    if (beam.src.includes('beamOnOFF.svg')) {
        beam.src = 'static//icon/beamOFF.svg';
    } else {
        beam.src = 'static//icon/beamOnOFF.svg';
    }
}

function toggleLight(element) {
    const light = element.querySelector('.lightOnOFF');
    if (light.src.includes('lightOnOFF.svg')) {
        light.src = 'static//icon/lightOFF.svg';
    } else {
        light.src = 'static//icon/lightOnOFF.svg';
    }
}

function showSendAlertBox(button) {
    // 클릭된 버튼의 부모 .room-container 찾기
    const roomContainer = button.closest('.room-container');
    if (!roomContainer) {
        console.error('room-container를 찾을 수 없습니다.');
        return;
    }

    const alertBox = roomContainer.querySelector('.message-send-alert-box'); // 해당 룸의 alertBox 선택
    const messageInput = roomContainer.querySelector('.room-message-input'); // room-footer에서 입력 필드 선택

    if (alertBox && messageInput) {
        alertBox.style.display = 'block'; // 알림창 표시
        messageInput.value = ''; // 입력 필드 초기화

        setTimeout(() => {
            alertBox.style.display = 'none'; // 3초 후 알림창 숨기기
        }, 3000);
    } else {
        console.error('alertBox 또는 messageInput을 찾을 수 없습니다.');
    }
}


// 사이드바 열기/닫기 토글
function toggleSidebar(panelId) {
    const panel = document.getElementById(panelId);
    if (panel.classList.contains('open')) {
        panel.classList.remove('open'); // 닫기
    } else {
        panel.classList.add('open'); // 열기
    }
}


// 알림창 표시 함수
function showAlert() {
    const alertBox = document.getElementById('alertBox');
    alertBox.style.display = 'block'; // 알림창 표시
}


const timeTableData = [
    { time: "10:00", slots: ["이한나", "", "", "", "", ""] },
    { time: "11:00", slots: ["이한나", "", "최상철", "", "", ""] },
    { time: "12:00", slots: ["", "김철수", "", "", "", ""] },
    { time: "13:00", slots: ["", "", "", "", "", ""] },
    { time: "14:00", slots: ["", "", "김민주", "", "", ""] },
    { time: "15:00", slots: ["", "", "김민주", "", "권민서", ""] },
    { time: "16:00", slots: ["", "", "", "", "권민서", ""] },
    { time: "17:00", slots: ["", "", "", "", "권민서", ""] },
    { time: "18:00", slots: ["", "김건", "이도연", "", "권민서", ""] },
    { time: "19:00", slots: ["", "김건", "이도연", "", "", ""] },
    { time: "20:00", slots: ["", "김건", "이도연", "", "", ""] },
    { time: "21:00", slots: ["", "", "", "", "", ""] },
    { time: "", slots: ["", "", "", "", "", ""] },
];

const timeTableBody = document.querySelector(".time-table-body");

// 타임테이블 데이터 렌더링
timeTableData.forEach((row) => {
    const timeRow = document.createElement("div");
    timeRow.classList.add("time-row");
    timeRow.setAttribute("data-time", row.time);

    // 시간 셀 추가
    const timeCell = document.createElement("div");
    timeCell.classList.add("time-cell");
    timeCell.textContent = row.time.split(":")[0]; // 시간만 표시
    timeRow.appendChild(timeCell);

    // 슬롯 추가
    row.slots.forEach((name) => {
        const timeSlot = document.createElement("div");
        timeSlot.classList.add("time-slot");
        if (name) {
            timeSlot.setAttribute("data-name", name);
            timeSlot.textContent = name;
        }
        timeRow.appendChild(timeSlot);
    });

    timeTableBody.appendChild(timeRow);
});

// 천천히 내려가는 모션을 적용할 이미지 요소 가져오기
const nowIcon = document.querySelector('img[src="static/icon/Now.svg"]');

// 이미지에 애니메이션 클래스 추가
nowIcon.classList.add('smooth-slide');

// 검색 입력 필드와 연락처 리스트 가져오기
const searchInput = document.getElementById('searchInput');
const contactList = document.getElementById('contactList');
const contacts = contactList.querySelectorAll('.content-box-4-content-container');

// 검색 이벤트 추가
searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase(); // 입력값을 소문자로 변환
    contacts.forEach(contact => {
        const contactText = contact.textContent.toLowerCase(); // 연락처 텍스트를 소문자로 변환
        if (contactText.includes(filter)) {
            contact.style.display = ''; // 필터에 맞는 항목은 표시
        } else {
            contact.style.display = 'none'; // 필터에 맞지 않는 항목은 숨김
        }
    });
});

// 챗봇 기능
const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

// 전송 버튼 클릭 이벤트
sendButton.addEventListener('click', () => {
    sendMessage();
});

// Enter 키 이벤트 추가
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') { // Enter 키를 눌렀을 때
        sendMessage();
    }
});

// 메시지 전송 함수
function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        addUserMessage(userMessage);
        getBotResponse(userMessage);
        userInput.value = ''; // 입력 필드 초기화
    }
}

// 사용자 메시지 추가
function addUserMessage(message) {
    const userChat = document.createElement('div');
    userChat.classList.add('user-chat');
    userChat.innerHTML = `
        <div class="chat-bubble">${message}</div>
    `;
    chatContainer.appendChild(userChat);
    chatContainer.scrollTop = chatContainer.scrollHeight; // 스크롤 하단으로 이동
}

// 챗봇 응답 추가
function getBotResponse(message) {
    const botChat = document.createElement('div');
    botChat.classList.add('bot-chat');
    botChat.innerHTML = `
        <img src="static/icon/chatBot.svg" class="chat-icon">
        <div class="chat-bubble">${generateBotReply(message)}</div>
    `;
    chatContainer.appendChild(botChat);
    chatContainer.scrollTop = chatContainer.scrollHeight; // 스크롤 하단으로 이동
}

// 챗봇 응답 생성
function generateBotReply(message) {
    // 간단한 응답 로직
    if (message.includes('안녕')) {
        return '안녕하세요! 무엇을 도와드릴까요?';
    } else if (message.includes('시간')) {
        return '현재 시간을 확인 중입니다.';
    } else {
        return '죄송합니다. 이해하지 못했습니다.';
    }
}

// 퇴근까지 남은 시간을 계산하고 Progress Bar를 업데이트
function updateProgressBar() {
    const totalWorkTime = 8 * 60; // 총 근무 시간 (분 단위, 예: 8시간)
    const remainingTimeElement = document.getElementById('remainingTime');
    const progressBar = document.getElementById('progressBar');

    // 현재 남은 시간 (예: "06시간 33분" 형식)
    const remainingTimeText = remainingTimeElement.textContent;
    const [hours, minutes] = remainingTimeText.match(/\d+/g).map(Number);
    const remainingMinutes = hours * 60 + minutes;

    // 진행률 계산
    const progress = ((totalWorkTime - remainingMinutes) / totalWorkTime) * 100;

    // Progress Bar 업데이트
    progressBar.style.width = `${progress}%`;

    // 남은 시간이 0이 되면 작업 중지
    if (remainingMinutes <= 0) {
        clearInterval(progressInterval);
        remainingTimeElement.textContent = "퇴근 시간입니다!";
    } else {
        // 남은 시간 감소 (1분 단위)
        const newRemainingMinutes = remainingMinutes - 1;
        const newHours = Math.floor(newRemainingMinutes / 60);
        const newMinutes = newRemainingMinutes % 60;
        remainingTimeElement.textContent = `${String(newHours).padStart(2, '0')}시간 ${String(newMinutes).padStart(2, '0')}분`;
    }
}

// 1분마다 Progress Bar 업데이트
const progressInterval = setInterval(updateProgressBar, 60000);

// 초기 업데이트 호출
updateProgressBar();