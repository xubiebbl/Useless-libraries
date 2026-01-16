// 全局变量
let currentDate = new Date();
let totalCost = 0;
let totalWinnings = 0;
let winningStats = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
    sixth: 0
};
let userAge = 0;
let initialUserAge = 0;
let initialDate = new Date();
let purchaseCount = 0;
let isAutoBuying = false;
let autoSaveInterval = null;
let dataChanged = false;
let shouldPauseAutoBuy = false;

// IndexedDB相关变量
let db;
const DB_NAME = 'DoubleColorBallDB';
const DB_VERSION = 2;
const STORE_BETTING_RECORDS = 'bettingRecords';
const STORE_GAME_STATE = 'gameState';

// 奖金配置
const prizeAmounts = {
    first: 5000000,  // 模拟值，实际为浮动奖金
    second: 500000,   // 模拟值，实际为浮动奖金
    third: 3000,
    fourth: 200,
    fifth: 10,
    sixth: 5
};

// 数字格式化函数，添加千位分隔符
function formatNumber(num) {
    return num.toLocaleString();
}

// DOM元素变量声明
let ageVerificationPage;
let gamePage;
let ageInput;
let verifyAgeBtn;
let ageError;
let currentDateEl;
let totalCostEl;
let totalWinningsEl;
let groupCountInput;
let noteCountInput;
let currentCostEl;
let buyTicketBtn;
let drawingResultEl;
let redBallsResultEl;
let blueBallResultEl;
let ticketResultsEl;
let ticketGroupsEl;
let firstPrizeCountEl;
let secondPrizeCountEl;
let thirdPrizeCountEl;
let fourthPrizeCountEl;
let fifthPrizeCountEl;
let sixthPrizeCountEl;
let firstPrizeProbabilityEl;
let secondPrizeProbabilityEl;
let thirdPrizeProbabilityEl;
let fourthPrizeProbabilityEl;
let fifthPrizeProbabilityEl;
let sixthPrizeProbabilityEl;
let gameInfoEl;
let todayDateEl;
let userAgeEl;
let purchaseCountEl;
let netLossEl;
let autoFirstPrizeBtn;
let pauseAutoBtn;
let showProcessCheckbox;
let resetBtn;
let backToHomeBtn;
let saveBtn;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    ageVerificationPage = document.getElementById('age-verification');
    gamePage = document.getElementById('game-page');
    ageInput = document.getElementById('age');
    verifyAgeBtn = document.getElementById('verify-age');
    ageError = document.getElementById('age-error');
    totalCostEl = document.getElementById('total-cost');
    totalWinningsEl = document.getElementById('total-winnings');
    groupCountInput = document.getElementById('group-count');
    noteCountInput = document.getElementById('note-count');
    currentCostEl = document.getElementById('current-cost');
    buyTicketBtn = document.getElementById('buy-ticket');
    drawingResultEl = document.getElementById('drawing-result');
    redBallsResultEl = document.getElementById('red-balls-result');
    blueBallResultEl = document.getElementById('blue-ball-result');
    ticketResultsEl = document.getElementById('ticket-results');
    ticketGroupsEl = document.getElementById('ticket-groups');
    firstPrizeCountEl = document.getElementById('first-prize-count');
    secondPrizeCountEl = document.getElementById('second-prize-count');
    thirdPrizeCountEl = document.getElementById('third-prize-count');
    fourthPrizeCountEl = document.getElementById('fourth-prize-count');
    fifthPrizeCountEl = document.getElementById('fifth-prize-count');
    sixthPrizeCountEl = document.getElementById('sixth-prize-count');
    firstPrizeProbabilityEl = document.getElementById('first-prize-probability');
    secondPrizeProbabilityEl = document.getElementById('second-prize-probability');
    thirdPrizeProbabilityEl = document.getElementById('third-prize-probability');
    fourthPrizeProbabilityEl = document.getElementById('fourth-prize-probability');
    fifthPrizeProbabilityEl = document.getElementById('fifth-prize-probability');
    sixthPrizeProbabilityEl = document.getElementById('sixth-prize-probability');
    gameInfoEl = document.getElementById('game-info');
    todayDateEl = document.getElementById('today-date');
    userAgeEl = document.getElementById('user-age');
    purchaseCountEl = document.getElementById('purchase-count');
    netLossEl = document.getElementById('net-loss');
    autoFirstPrizeBtn = document.getElementById('auto-first-prize');
    pauseAutoBtn = document.getElementById('pause-auto');
    showProcessCheckbox = document.getElementById('show-process');
    resetBtn = document.getElementById('resetBtn');
    backToHomeBtn = document.getElementById('backToHome');
    saveBtn = document.getElementById('saveBtn');
    
    // 初始化IndexedDB
    initDB().then(() => {
        // 等待数据库初始化和状态加载完成
        // 设置初始日期
        updateDateDisplay();
    });
    
    // 初始化自选号码界面
    initManualSelection();
    
    // 年龄验证
    verifyAgeBtn.addEventListener('click', verifyAge);
    ageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            verifyAge();
        }
    });
    
    // 彩票设置
    groupCountInput.addEventListener('change', updateCurrentCost);
    noteCountInput.addEventListener('change', updateCurrentCost);
    
    // 购买彩票
    buyTicketBtn.addEventListener('click', buyTicket);
    
    // 一键一等奖
    autoFirstPrizeBtn.addEventListener('click', autoBuyUntilFirstPrize);
    
    // 暂停按钮
    pauseAutoBtn.addEventListener('click', pauseAutoBuy);
    
    // 重置按钮
    resetBtn.addEventListener('click', resetGame);
    
    // 返回主页按钮（自动保存）
    backToHomeBtn.addEventListener('click', async function() {
        if (db) {
            try {
                await saveGameState();
            } catch (error) {
                console.error('自动保存失败:', error);
            }
        }
        window.location.href = 'index.html';
    });
    
    // 保存按钮
    saveBtn.addEventListener('click', function() {
        if (!db) {
            alert('数据库未初始化，请稍后再试');
            return;
        }
        
        console.log('开始保存游戏状态...');
        console.log('当前数据:', {
            currentDate: currentDate,
            totalCost: totalCost,
            totalWinnings: totalWinnings,
            userAge: userAge,
            initialUserAge: initialUserAge,
            purchaseCount: purchaseCount
        });
        
        saveGameState().then(() => {
            alert('保存成功！');
        }).catch(error => {
            console.error('保存失败:', error);
            alert('保存失败：' + error.message);
        });
    });
    
    // 浏览器关闭前自动保存
    window.addEventListener('beforeunload', function(e) {
        if (db && userAge > 0) {
            saveGameState().catch(error => {
                console.error('关闭前自动保存失败:', error);
            });
        }
    });
    
    // 初始化当前花费
    updateCurrentCost();
});

// 年龄验证
function verifyAge() {
    const age = parseInt(ageInput.value);
    
    if (isNaN(age) || age < 1) {
        ageError.textContent = '请输入有效的年龄';
        return;
    }
    
    if (age < 18) {
        ageError.textContent = '根据相关规定，购买彩票需年满18周岁';
        return;
    }
    
    // 保存初始年龄和初始日期
    initialUserAge = age;
    userAge = age;
    initialDate = new Date();
    userAgeEl.textContent = age;
    
    // 验证通过，清除年龄验证内容，显示游戏页面
    ageVerificationPage.style.display = 'none';
    gamePage.style.display = 'block';
    
    // 启动自动保存定时器（每30秒保存一次）
    startAutoSave();
    
    // 更新游戏信息
    updateGameInfo();
}

// 计算当前年龄（基于日期增长）
function calculateCurrentAge() {
    const yearsPassed = Math.floor((currentDate - initialDate) / (1000 * 60 * 60 * 24 * 365));
    userAge = initialUserAge + yearsPassed;
    userAgeEl.textContent = userAge;
}

// 更新日期显示
function updateDateDisplay() {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    todayDateEl.textContent = `${year}-${month}-${day}`;
}

// 更新游戏信息
function updateGameInfo() {
    purchaseCountEl.textContent = purchaseCount;
    const netLoss = totalCost - totalWinnings;
    netLossEl.textContent = formatNumber(netLoss);
}

// 启动自动保存定时器
function startAutoSave() {
    // 清除已存在的定时器
    stopAutoSave();
    
    // 每30秒自动保存一次
    autoSaveInterval = setInterval(function() {
        if (db && userAge > 0 && dataChanged) {
            saveGameState().then(() => {
                dataChanged = false;
            }).catch(error => {
                console.error('自动保存失败:', error);
            });
        }
    }, 30000); // 30秒 = 30000毫秒
}

// 停止自动保存定时器
function stopAutoSave() {
    if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
        autoSaveInterval = null;
    }
}

// 更新当前花费
function updateCurrentCost() {
    let groupCount;
    const noteCount = parseInt(noteCountInput.value) || 1;
    
    // 根据选号方式确定组数
    if (selectionMode === 'manual') {
        // 自选模式：获取已填写的组数
        const filledGroups = getFilledManualGroups();
        groupCount = filledGroups.length > 0 ? filledGroups.length : 1;
    } else {
        // 机选模式：使用设置的组数
        groupCount = parseInt(groupCountInput.value) || 1;
    }
    
    const cost = groupCount * noteCount * 2;
    currentCostEl.textContent = cost;
}

// 生成随机号码
function generateRandomNumbers() {
    // 生成6个不重复的红球号码（1-33）
    const redBalls = [];
    while (redBalls.length < 6) {
        const num = Math.floor(Math.random() * 33) + 1;
        if (!redBalls.includes(num)) {
            redBalls.push(num);
        }
    }
    
    // 排序红球号码
    redBalls.sort((a, b) => a - b);
    
    // 生成1个蓝球号码（1-16）
    const blueBall = Math.floor(Math.random() * 16) + 1;
    
    return { redBalls, blueBall };
}

// 生成开奖号码
function generateDrawingNumbers() {
    return generateRandomNumbers();
}

// 计算下一个开奖日期（周二、周四、周日）
function getNextDrawingDate(date) {
    const nextDate = new Date(date);
    let dayOfWeek = nextDate.getDay(); // 0是周日，1是周一，以此类推
    
    // 计算到下一个开奖日的天数
    let daysToAdd;
    if (dayOfWeek === 0) { // 周日
        daysToAdd = 2; // 到周二
    } else if (dayOfWeek === 1) { // 周一
        daysToAdd = 1; // 到周二
    } else if (dayOfWeek === 2) { // 周二
        daysToAdd = 2; // 到周四
    } else if (dayOfWeek === 3) { // 周三
        daysToAdd = 1; // 到周四
    } else if (dayOfWeek === 4) { // 周四
        daysToAdd = 3; // 到周日
    } else if (dayOfWeek === 5) { // 周五
        daysToAdd = 2; // 到周日
    } else { // 周六
        daysToAdd = 1; // 到周日
    }
    
    nextDate.setDate(nextDate.getDate() + daysToAdd);
    return nextDate;
}

// 判断中奖等级
function determinePrizeLevel(ticketNumbers, drawingNumbers) {
    const { redBalls: ticketReds, blueBall: ticketBlue } = ticketNumbers;
    const { redBalls: drawingReds, blueBall: drawingBlue } = drawingNumbers;
    
    // 计算红球匹配数
    let redMatches = 0;
    for (const red of ticketReds) {
        if (drawingReds.includes(red)) {
            redMatches++;
        }
    }
    
    // 计算蓝球是否匹配
    const blueMatch = ticketBlue === drawingBlue;
    
    // 根据匹配情况确定奖级
    if (redMatches === 6 && blueMatch) {
        return 'first'; // 一等奖
    } else if (redMatches === 6) {
        return 'second'; // 二等奖
    } else if (redMatches === 5 && blueMatch) {
        return 'third'; // 三等奖
    } else if (redMatches === 5 || (redMatches === 4 && blueMatch)) {
        return 'fourth'; // 四等奖
    } else if (redMatches === 4 || (redMatches === 3 && blueMatch)) {
        return 'fifth'; // 五等奖
    } else if ((redMatches === 2 && blueMatch) || (redMatches === 1 && blueMatch) || (redMatches === 0 && blueMatch)) {
        return 'sixth'; // 六等奖
    }
    
    return null; // 未中奖
}

// 更新中奖统计
function updateWinningStats(prizeLevel, drawingNumbers) {
    if (!prizeLevel) return;
    
    winningStats[prizeLevel]++;
    
    // 检查成就
    checkAchievements(prizeLevel, drawingNumbers);
    
    // 触发中奖特效
    triggerWinningEffect(prizeLevel);
    
    // 更新DOM
    firstPrizeCountEl.textContent = winningStats.first;
    secondPrizeCountEl.textContent = winningStats.second;
    thirdPrizeCountEl.textContent = winningStats.third;
    fourthPrizeCountEl.textContent = winningStats.fourth;
    fifthPrizeCountEl.textContent = winningStats.fifth;
    sixthPrizeCountEl.textContent = winningStats.sixth;
    
    // 更新概率
    updatePrizeProbabilities();
}

function updatePrizeProbabilities() {
    const probability = (count) => {
        if (purchaseCount === 0) return '0.00‰';
        return ((count / purchaseCount) * 1000).toFixed(2) + '‰';
    };
    
    firstPrizeProbabilityEl.textContent = probability(winningStats.first);
    secondPrizeProbabilityEl.textContent = probability(winningStats.second);
    thirdPrizeProbabilityEl.textContent = probability(winningStats.third);
    fourthPrizeProbabilityEl.textContent = probability(winningStats.fourth);
    fifthPrizeProbabilityEl.textContent = probability(winningStats.fifth);
    sixthPrizeProbabilityEl.textContent = probability(winningStats.sixth);
}

// 创建号码球元素
function createBallElement(number, type, isHighlighted = false) {
    const ball = document.createElement('div');
    ball.classList.add('ball');
    ball.classList.add(type === 'red' ? 'red-ball' : 'blue-ball');
    if (isHighlighted) {
        ball.classList.add('highlighted');
    }
    ball.textContent = number.toString().padStart(2, '0');
    return ball;
}

// 购买彩票
function buyTicket() {
    // 显示加载状态
    buyTicketBtn.disabled = true;
    buyTicketBtn.classList.add('loading');
    autoFirstPrizeBtn.disabled = true;
    
    // 获取组数和每组注数
    let groupCount;
    let noteCount = parseInt(noteCountInput.value) || 1;
    
    // 根据选号方式确定组数
    if (selectionMode === 'manual') {
        // 自选模式：获取已填写的组数
        const filledGroups = getFilledManualGroups();
        if (filledGroups.length === 0) {
            // 如果没有填写任何组，自动填充
            autoFillManualSelections();
            groupCount = getFilledManualGroups().length;
        } else {
            groupCount = filledGroups.length;
        }
    } else {
        // 机选模式：使用设置的组数
        groupCount = parseInt(groupCountInput.value) || 1;
    }
    
    // 计算花费
    const cost = groupCount * noteCount * 2;
    totalCost += cost;
    totalCostEl.textContent = formatNumber(totalCost);
    
    // 增加购买组数
    purchaseCount += groupCount;
    updateGameInfo();
    
    // 生成开奖号码
    const drawingNumbers = generateDrawingNumbers();
    
    // 生成每组彩票
    const ticketGroups = [];
    let totalGroupWinnings = 0;
    const wonPrizes = [];
    
    for (let i = 0; i < groupCount; i++) {
        let ticketNumbers;
        
        // 根据选号方式生成号码
        if (selectionMode === 'manual') {
            // 自选模式：使用用户选择的号码
            const selection = getFilledManualGroups()[i];
            ticketNumbers = {
                redBalls: [...selection.redBalls],
                blueBall: selection.blueBall
            };
        } else {
            // 机选模式：随机生成号码
            ticketNumbers = generateRandomNumbers();
        }
        
        const prizeLevel = determinePrizeLevel(ticketNumbers, drawingNumbers);
        const prizeAmount = prizeLevel ? prizeAmounts[prizeLevel] : 0;
        
        const groupWinnings = prizeAmount * noteCount;
        totalGroupWinnings += groupWinnings;
        
        if (prizeLevel) {
            wonPrizes.push(prizeLevel);
        }
        
        // 如果中了一等奖，禁用按钮
        if (prizeLevel === 'first') {
            buyTicketBtn.disabled = true;
            autoFirstPrizeBtn.disabled = true;
            groupCountInput.disabled = true;
            noteCountInput.disabled = true;
        }
        
        ticketGroups.push({
            groupNumber: i + 1,
            ticketNumbers,
            prizeLevel,
            prizeAmount,
            noteCount,
            totalWinnings: groupWinnings
        });
    }
    
    // 更新所有中奖统计
    wonPrizes.forEach(prizeLevel => {
        updateWinningStats(prizeLevel, drawingNumbers);
    });
    
    // 找出最高奖项并触发特效
    if (wonPrizes.length > 0) {
        const prizeOrder = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
        let highestPrize = wonPrizes[0];
        for (const prize of wonPrizes) {
            if (prizeOrder.indexOf(prize) < prizeOrder.indexOf(highestPrize)) {
                highestPrize = prize;
            }
        }
        triggerWinningEffect(highestPrize);
    }
    
    // 更新总奖金
    totalWinnings += totalGroupWinnings;
    totalWinningsEl.textContent = formatNumber(totalWinnings);
    
    // 更新日期
    currentDate = getNextDrawingDate(currentDate);
    updateDateDisplay();
    
    // 更新年龄
    calculateCurrentAge();
    
    // 检查成就
    checkAchievements(null, drawingNumbers);
    
    // 标记数据已变更
    dataChanged = true;
    
    // 显示开奖结果
    displayDrawingResult(drawingNumbers);
    
    // 显示投注结果
    displayTicketResults(ticketGroups, drawingNumbers);
    
    // 恢复按钮状态
    setTimeout(() => {
        buyTicketBtn.disabled = false;
        buyTicketBtn.classList.remove('loading');
        autoFirstPrizeBtn.disabled = false;
    }, 1000);
}

// 显示开奖结果
function displayDrawingResult(drawingNumbers) {
    // 如果不显示过程，直接返回
    if (!showProcessCheckbox.checked) {
        drawingResultEl.style.display = 'none';
        return;
    }
    
    // 清空之前的结果
    redBallsResultEl.innerHTML = '';
    blueBallResultEl.innerHTML = '';
    
    // 显示红球
    for (const red of drawingNumbers.redBalls) {
        redBallsResultEl.appendChild(createBallElement(red, 'red'));
    }
    
    // 显示蓝球
    blueBallResultEl.appendChild(createBallElement(drawingNumbers.blueBall, 'blue'));
    
    // 显示开奖结果区域
    drawingResultEl.style.display = 'block';
}

// 显示投注结果
function displayTicketResults(ticketGroups, drawingNumbers) {
    // 如果不显示过程，直接返回
    if (!showProcessCheckbox.checked) {
        ticketResultsEl.style.display = 'none';
        return;
    }
    
    ticketGroupsEl.innerHTML = '';
    
    for (const group of ticketGroups) {
        const groupEl = document.createElement('div');
        groupEl.classList.add('ticket-group');
        
        const groupHeader = document.createElement('div');
        groupHeader.classList.add('group-header');
        
        const groupTitle = document.createElement('div');
        groupTitle.classList.add('group-title');
        groupTitle.textContent = `第 ${group.groupNumber} 组`;
        
        const groupPrize = document.createElement('div');
        groupPrize.classList.add('group-prize');
        
        const { redBalls: ticketReds, blueBall: ticketBlue } = group.ticketNumbers;
        const { redBalls: drawingReds, blueBall: drawingBlue } = drawingNumbers;
        
        let redMatches = 0;
        for (const red of ticketReds) {
            if (drawingReds.includes(red)) {
                redMatches++;
            }
        }
        
        const blueMatch = ticketBlue === drawingBlue ? 1 : 0;
        
        groupPrize.textContent = `本组中红球${redMatches}个,篮球${blueMatch}个，奖金：${group.totalWinnings} 元`;
        
        groupHeader.appendChild(groupTitle);
        groupHeader.appendChild(groupPrize);
        
        const ticketsEl = document.createElement('div');
        ticketsEl.classList.add('tickets');
        
        const ticketEl = document.createElement('div');
        ticketEl.classList.add('ticket');
        
        const ticketNumbersEl = document.createElement('div');
        ticketNumbersEl.classList.add('ticket-numbers');
        
        for (const red of ticketReds) {
            const isHighlighted = drawingReds.includes(red);
            ticketNumbersEl.appendChild(createBallElement(red, 'red', isHighlighted));
        }
        
        const isBlueHighlighted = ticketBlue === drawingBlue;
        ticketNumbersEl.appendChild(createBallElement(ticketBlue, 'blue', isBlueHighlighted));
        
        // 创建单注奖金信息元素
        const ticketPrizeEl = document.createElement('div');
        ticketPrizeEl.classList.add('ticket-prize');
        // 拼接显示：单注奖金 × 注数 = 总奖金
        ticketPrizeEl.textContent = `单注奖金：${group.prizeAmount} 元 × ${group.noteCount}注 = ${group.totalWinnings} 元`;
        ticketEl.appendChild(ticketNumbersEl);
        ticketEl.appendChild(ticketPrizeEl);
        
        ticketsEl.appendChild(ticketEl);
        
        groupEl.appendChild(groupHeader);
        groupEl.appendChild(ticketsEl);
        
        ticketGroupsEl.appendChild(groupEl);
    }
    
    ticketResultsEl.style.display = 'block';
}

// 成就系统相关变量
let achievements = {
    first: false,
    second: false,
    third: false,
    fourth: false,
    fifth: false,
    sixth: false,
    redCollection: false,
    blueCollection: false
};

let redBallHistory = new Set();
let blueBallHistory = new Set();

// 成就信息配置
const achievementInfo = {
    first: { icon: '🏆', name: '一等奖' },
    second: { icon: '🥈', name: '二等奖' },
    third: { icon: '🥉', name: '三等奖' },
    fourth: { icon: '⭐', name: '四等奖' },
    fifth: { icon: '💫', name: '五等奖' },
    sixth: { icon: '✨', name: '六等奖' },
    redCollection: { icon: '🔴', name: '红球全收集' },
    blueCollection: { icon: '🔵', name: '蓝球全收集' }
};

// 检查成就
function checkAchievements(prizeLevel, drawingNumbers) {
    let unlockedAchievements = [];
    
    // 检查奖级成就
    if (prizeLevel && !achievements[prizeLevel]) {
        achievements[prizeLevel] = true;
        unlockedAchievements.push(prizeLevel);
    }
    
    // 更新红球历史
    if (drawingNumbers && drawingNumbers.redBalls) {
        drawingNumbers.redBalls.forEach(num => {
            redBallHistory.add(num);
        });
        
        // 检查红球收集成就（1-33全部出现过）
        if (!achievements.redCollection && redBallHistory.size === 33) {
            achievements.redCollection = true;
            unlockedAchievements.push('redCollection');
        }
    }
    
    // 更新蓝球历史
    if (drawingNumbers && drawingNumbers.blueBall) {
        blueBallHistory.add(drawingNumbers.blueBall);
        
        // 检查蓝球收集成就（1-16全部出现过）
        if (!achievements.blueCollection && blueBallHistory.size === 16) {
            achievements.blueCollection = true;
            unlockedAchievements.push('blueCollection');
        }
    }
    
    // 显示解锁的成就
    unlockedAchievements.forEach(achievementId => {
        showAchievementUnlock(achievementId);
        updateAchievementDisplay(achievementId);
    });
    
    // 标记数据已变更
    if (unlockedAchievements.length > 0) {
        dataChanged = true;
    }
}

// 显示成就解锁动画
function showAchievementUnlock(achievementId) {
    const info = achievementInfo[achievementId];
    
    // 创建通知容器
    const notification = document.createElement('div');
    notification.classList.add('achievement-notification');
    
    // 创建通知内容
    const content = document.createElement('div');
    content.classList.add('achievement-notification-content');
    
    // 创建图标
    const icon = document.createElement('div');
    icon.classList.add('achievement-notification-icon');
    icon.textContent = info.icon;
    
    // 创建标题
    const title = document.createElement('div');
    title.classList.add('achievement-notification-title');
    title.textContent = '成就解锁！';
    
    // 创建成就名称
    const name = document.createElement('div');
    name.classList.add('achievement-notification-name');
    name.textContent = info.name;
    
    // 组装元素
    content.appendChild(icon);
    content.appendChild(title);
    content.appendChild(name);
    notification.appendChild(content);
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 动画结束后移除元素
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// 更新成就显示
function updateAchievementDisplay(achievementId) {
    const badge = document.getElementById(`achievement-${achievementId}`);
    if (badge) {
        badge.classList.add('unlocked');
    }
}

// 更新所有成就显示
function updateAllAchievementsDisplay() {
    Object.keys(achievements).forEach(achievementId => {
        if (achievements[achievementId]) {
            updateAchievementDisplay(achievementId);
        }
    });
}

// 初始化成就显示
function initAchievementDisplay() {
    Object.keys(achievements).forEach(achievementId => {
        if (achievements[achievementId]) {
            updateAchievementDisplay(achievementId);
        }
    });
}

// 保存成就状态
function saveAchievements() {
    const achievementsData = {
        achievements: achievements,
        redBallHistory: Array.from(redBallHistory),
        blueBallHistory: Array.from(blueBallHistory)
    };
    return achievementsData;
}

// 加载成就状态
function loadAchievements(data) {
    if (data && data.achievements) {
        achievements = { ...achievements, ...data.achievements };
    }
    
    if (data && data.redBallHistory && Array.isArray(data.redBallHistory)) {
        redBallHistory = new Set(data.redBallHistory);
    }
    
    if (data && data.blueBallHistory && Array.isArray(data.blueBallHistory)) {
        blueBallHistory = new Set(data.blueBallHistory);
    }
    
    // 初始化成就显示
    initAchievementDisplay();
}

// 自选号码相关变量
let selectionMode = 'random';
let manualSelections = {};
let currentManualGroup = 1;
const MAX_MANUAL_GROUPS = 10;

// 初始化自选号码界面
function initManualSelection() {
    // 初始化10组自选号码
    for (let i = 1; i <= MAX_MANUAL_GROUPS; i++) {
        manualSelections[i] = {
            redBalls: [],
            blueBall: null
        };
    }
    
    // 生成红球选择区域
    const redBallsContainer = document.getElementById('manual-red-balls');
    if (redBallsContainer) {
        for (let i = 1; i <= 33; i++) {
            const ball = document.createElement('div');
            ball.classList.add('manual-ball');
            ball.textContent = i.toString().padStart(2, '0');
            ball.dataset.number = i;
            ball.dataset.type = 'red';
            ball.addEventListener('click', () => toggleManualBall(i, 'red'));
            redBallsContainer.appendChild(ball);
        }
    }
    
    // 生成蓝球选择区域
    const blueBallsContainer = document.getElementById('manual-blue-balls');
    if (blueBallsContainer) {
        for (let i = 1; i <= 16; i++) {
            const ball = document.createElement('div');
            ball.classList.add('manual-ball');
            ball.textContent = i.toString().padStart(2, '0');
            ball.dataset.number = i;
            ball.dataset.type = 'blue';
            ball.addEventListener('click', () => toggleManualBall(i, 'blue'));
            blueBallsContainer.appendChild(ball);
        }
    }
    
    // 初始化标签页点击事件
    const tabs = document.querySelectorAll('.manual-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => switchManualGroup(parseInt(tab.dataset.group)));
        
        // 初始化时设置禁用状态
        const tabGroup = parseInt(tab.dataset.group);
        if (tabGroup === 1) {
            tab.classList.remove('disabled');
        } else {
            tab.classList.add('disabled');
        }
    });
    
    // 初始化选号方式切换
    const radioButtons = document.querySelectorAll('input[name="selection-mode"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', (e) => switchSelectionMode(e.target.value));
    });
    
    // 更新显示
    updateManualSelectionDisplay();
    
    // 更新本次花费
    updateCurrentCost();
}

// 切换选号方式
function switchSelectionMode(mode) {
    selectionMode = mode;
    const manualSelectionEl = document.getElementById('manual-selection');
    
    if (mode === 'manual') {
        manualSelectionEl.style.display = 'block';
        groupCountInput.disabled = true;
    } else {
        manualSelectionEl.style.display = 'none';
        groupCountInput.disabled = false;
    }
    
    // 更新本次花费
    updateCurrentCost();
}

// 切换自选号码组
function switchManualGroup(groupNumber) {
    // 检查是否可以切换到目标组
    // 只有当前组完成选球（6个红球+1个蓝球）才能切换到下一组
    if (groupNumber > currentManualGroup) {
        // 检查当前组是否完成
        const currentSelection = manualSelections[currentManualGroup];
        if (currentSelection.redBalls.length !== 6 || currentSelection.blueBall === null) {
            alert('请先完成当前组的选球（6个红球+1个蓝球）');
            return;
        }
    }
    
    currentManualGroup = groupNumber;
    
    // 更新标签页状态
    const tabs = document.querySelectorAll('.manual-tab');
    tabs.forEach(tab => {
        const tabGroup = parseInt(tab.dataset.group);
        if (tabGroup === groupNumber) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
        
        // 禁用未解锁的组
        // 第一组始终可用
        // 其他组需要前一组完成选球才能解锁
        if (tabGroup === 1) {
            tab.classList.remove('disabled');
        } else {
            const prevSelection = manualSelections[tabGroup - 1];
            if (prevSelection.redBalls.length === 6 && prevSelection.blueBall !== null) {
                tab.classList.remove('disabled');
            } else {
                tab.classList.add('disabled');
            }
        }
    });
    
    // 更新球选择区域显示
    updateManualSelectionDisplay();
    
    // 更新本次花费
    updateCurrentCost();
}

// 切换球选择状态
function toggleManualBall(number, type) {
    const selection = manualSelections[currentManualGroup];
    
    if (type === 'red') {
        const index = selection.redBalls.indexOf(number);
        if (index > -1) {
            // 取消选择
            selection.redBalls.splice(index, 1);
        } else {
            // 添加选择（最多6个）
            if (selection.redBalls.length < 6) {
                selection.redBalls.push(number);
                selection.redBalls.sort((a, b) => a - b);
            } else {
                alert('红球最多只能选择6个');
            }
        }
    } else if (type === 'blue') {
        if (selection.blueBall === number) {
            // 取消选择
            selection.blueBall = null;
        } else {
            // 添加选择（只能选1个）
            selection.blueBall = number;
        }
    }
    
    // 更新显示
    updateManualSelectionDisplay();
    
    // 更新本次花费
    updateCurrentCost();
    
    // 检查当前组是否完成选球，如果完成则更新标签页状态
    if (selection.redBalls.length === 6 && selection.blueBall !== null) {
        // 当前组完成，更新标签页状态以解锁下一组
        const tabs = document.querySelectorAll('.manual-tab');
        tabs.forEach(tab => {
            const tabGroup = parseInt(tab.dataset.group);
            if (tabGroup === 1) {
                tab.classList.remove('disabled');
            } else {
                const prevSelection = manualSelections[tabGroup - 1];
                if (prevSelection.redBalls.length === 6 && prevSelection.blueBall !== null) {
                    tab.classList.remove('disabled');
                } else {
                    tab.classList.add('disabled');
                }
            }
        });
    }
    
    // 标记数据已变更
    dataChanged = true;
}

// 更新自选号码显示
function updateManualSelectionDisplay() {
    const selection = manualSelections[currentManualGroup];
    
    // 更新红球显示
    const redBalls = document.querySelectorAll('#manual-red-balls .manual-ball');
    redBalls.forEach(ball => {
        const number = parseInt(ball.dataset.number);
        if (selection.redBalls.includes(number)) {
            ball.classList.add('selected');
        } else {
            ball.classList.remove('selected');
        }
    });
    
    // 更新蓝球显示
    const blueBalls = document.querySelectorAll('#manual-blue-balls .manual-ball');
    blueBalls.forEach(ball => {
        const number = parseInt(ball.dataset.number);
        if (selection.blueBall === number) {
            ball.classList.add('selected');
        } else {
            ball.classList.remove('selected');
        }
    });
    
    // 更新摘要信息
    const redCountEl = document.getElementById('selected-red-count');
    const blueCountEl = document.getElementById('selected-blue-count');
    const totalGroupsEl = document.getElementById('selected-group-count');
    
    if (redCountEl) {
        redCountEl.textContent = selection.redBalls.length;
    }
    if (blueCountEl) {
        blueCountEl.textContent = selection.blueBall ? 1 : 0;
    }
    if (totalGroupsEl) {
        const filledGroups = Object.values(manualSelections).filter(s => 
            s.redBalls.length === 6 && s.blueBall !== null
        ).length;
        totalGroupsEl.textContent = filledGroups;
    }
}

// 获取有效的自选号码组数
function getFilledManualGroups() {
    return Object.values(manualSelections).filter(s => 
        s.redBalls.length === 6 && s.blueBall !== null
    );
}

// 自动填充空位
function autoFillManualSelections() {
    for (let i = 1; i <= MAX_MANUAL_GROUPS; i++) {
        const selection = manualSelections[i];
        
        // 填充红球
        if (selection.redBalls.length < 6) {
            const availableReds = [];
            for (let j = 1; j <= 33; j++) {
                if (!selection.redBalls.includes(j)) {
                    availableReds.push(j);
                }
            }
            while (selection.redBalls.length < 6 && availableReds.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableReds.length);
                selection.redBalls.push(availableReds.splice(randomIndex, 1)[0]);
            }
            selection.redBalls.sort((a, b) => a - b);
        }
        
        // 填充蓝球
        if (selection.blueBall === null) {
            selection.blueBall = Math.floor(Math.random() * 16) + 1;
        }
    }
    
    // 更新显示
    updateManualSelectionDisplay();
    
    // 标记数据已变更
    dataChanged = true;
}

// 保存自选号码数据
function saveManualSelections() {
    return {
        selectionMode: selectionMode,
        manualSelections: manualSelections
    };
}

// 加载自选号码数据
function loadManualSelections(data) {
    if (data && data.selectionMode) {
        selectionMode = data.selectionMode;
        
        // 更新单选按钮状态
        const radioButtons = document.querySelectorAll('input[name="selection-mode"]');
        radioButtons.forEach(radio => {
            if (radio.value === selectionMode) {
                radio.checked = true;
            }
        });
        
        // 更新界面显示
        switchSelectionMode(selectionMode);
    }
    
    if (data && data.manualSelections) {
        manualSelections = { ...data.manualSelections };
        
        // 更新显示
        updateManualSelectionDisplay();
    }
}

// 一键一等奖
async function autoBuyUntilFirstPrize() {
    if (isAutoBuying) {
        return;
    }
    
    isAutoBuying = true;
    shouldPauseAutoBuy = false;
    buyTicketBtn.disabled = true;
    autoFirstPrizeBtn.disabled = true;
    autoFirstPrizeBtn.textContent = '购买中...';
    pauseAutoBtn.style.display = 'inline-block';
    
    let firstPrizeWon = false;
    let attempts = 0;
    const maxAttempts = 10000; // 防止无限循环
    
    while (!firstPrizeWon && attempts < maxAttempts && !shouldPauseAutoBuy) {
        attempts++;
        
        // 获取组数和每组注数
        let groupCount;
        const noteCount = parseInt(noteCountInput.value) || 1;
        
        // 根据选号方式确定组数
        if (selectionMode === 'manual') {
            // 自选模式：获取已填写的组数
            const filledGroups = getFilledManualGroups();
            if (filledGroups.length === 0) {
                // 如果没有填写任何组，自动填充
                autoFillManualSelections();
                groupCount = getFilledManualGroups().length;
            } else {
                groupCount = filledGroups.length;
            }
        } else {
            // 机选模式：使用设置的组数
            groupCount = parseInt(groupCountInput.value) || 1;
        }
        
        // 计算花费
        const cost = groupCount * noteCount * 2;
        totalCost += cost;
        totalCostEl.textContent = formatNumber(totalCost);
        
        // 增加购买组数
        purchaseCount += groupCount;
        updateGameInfo();
        
        // 生成开奖号码
        const drawingNumbers = generateDrawingNumbers();
        
        // 生成每组彩票
        const ticketGroups = [];
        let totalGroupWinnings = 0;
        const wonPrizes = [];
        
        for (let i = 0; i < groupCount; i++) {
            let ticketNumbers;
            
            // 根据选号方式生成号码
            if (selectionMode === 'manual') {
                // 自选模式：使用用户选择的号码
                const selection = getFilledManualGroups()[i];
                ticketNumbers = {
                    redBalls: [...selection.redBalls],
                    blueBall: selection.blueBall
                };
            } else {
                // 机选模式：随机生成号码
                ticketNumbers = generateRandomNumbers();
            }
            const prizeLevel = determinePrizeLevel(ticketNumbers, drawingNumbers);
            const prizeAmount = prizeLevel ? prizeAmounts[prizeLevel] : 0;
            
            const groupWinnings = prizeAmount * noteCount;
            totalGroupWinnings += groupWinnings;
            
            if (prizeLevel) {
                wonPrizes.push(prizeLevel);
            }
            
            if (prizeLevel === 'first') {
                firstPrizeWon = true;
                buyTicketBtn.disabled = true;
                autoFirstPrizeBtn.disabled = true;
                groupCountInput.disabled = true;
                noteCountInput.disabled = true;
            }
            
            ticketGroups.push({
                groupNumber: i + 1,
                ticketNumbers,
                prizeLevel,
                prizeAmount,
                noteCount,
                totalWinnings: groupWinnings
            });
        }
        
        // 更新所有中奖统计
        wonPrizes.forEach(prizeLevel => {
            updateWinningStats(prizeLevel, drawingNumbers);
        });
        
        // 找出最高奖项并触发特效（冲刺模式只对前三等奖显示特效）
        if (wonPrizes.length > 0) {
            const prizeOrder = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
            let highestPrize = wonPrizes[0];
            for (const prize of wonPrizes) {
                if (prizeOrder.indexOf(prize) < prizeOrder.indexOf(highestPrize)) {
                    highestPrize = prize;
                }
            }
            // 冲刺模式只对前三等奖显示特效
            if (['first', 'second', 'third'].includes(highestPrize)) {
                triggerWinningEffect(highestPrize);
            }
        }
        
        // 更新总奖金
        totalWinnings += totalGroupWinnings;
        totalWinningsEl.textContent = formatNumber(totalWinnings);
        
        // 更新日期
        currentDate = getNextDrawingDate(currentDate);
        updateDateDisplay();
        
        // 更新年龄
        calculateCurrentAge();
        
        // 检查成就
        checkAchievements(null, drawingNumbers);
        
        // 标记数据已变更
        dataChanged = true;
        
        // 显示开奖结果
        displayDrawingResult(drawingNumbers);
        
        // 显示投注结果
        displayTicketResults(ticketGroups, drawingNumbers);
        
        // 短暂延迟以便UI更新（只在显示过程时延迟）
        if (showProcessCheckbox.checked) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
    
    isAutoBuying = false;
    buyTicketBtn.disabled = false;
    autoFirstPrizeBtn.disabled = false;
    autoFirstPrizeBtn.textContent = '冲刺一等奖';
    pauseAutoBtn.style.display = 'none';
    
    if (firstPrizeWon) {
        alert(`恭喜！经过 ${attempts} 次购买，终于中了一等奖！`);
    } else if (shouldPauseAutoBuy) {
        alert(`已暂停，共进行了 ${attempts} 次购买。`);
    } else {
        alert(`已达到最大尝试次数 ${maxAttempts} 次，仍未中一等奖。`);
    }
}

// 暂停自动购买
function pauseAutoBuy() {
    shouldPauseAutoBuy = true;
}

// 彩带特效函数
function createConfetti() {
    const container = document.createElement('div');
    container.classList.add('confetti-container');
    document.body.appendChild(container);
    
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#e67e22', '#1abc9c', '#e91e63'];
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const animationDuration = 2 + Math.random() * 3;
        const animationDelay = Math.random() * 0.3;
        const size = 5 + Math.random() * 10;
        const rotation = Math.random() * 360;
        
        confetti.style.backgroundColor = color;
        confetti.style.left = `${left}%`;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.animationDuration = `${animationDuration}s`;
        confetti.style.animationDelay = `${animationDelay}s`;
        confetti.style.transform = `rotate(${rotation}deg)`;
        
        container.appendChild(confetti);
    }
    
    setTimeout(() => {
        container.remove();
    }, 5000);
}

// 荧光字特效函数
function createNeonText(text) {
    const container = document.createElement('div');
    container.classList.add('neon-text-container');
    
    const neonText = document.createElement('div');
    neonText.classList.add('neon-text');
    neonText.textContent = text;
    
    container.appendChild(neonText);
    document.body.appendChild(container);
    
    setTimeout(() => {
        container.remove();
    }, 2000);
}

// IndexedDB初始化函数
function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onerror = function(event) {
            console.error('IndexedDB打开失败:', event.target.error);
            alert('数据库初始化失败，数据将无法保存');
            reject(event.target.error);
        };
        
        request.onsuccess = function(event) {
            db = event.target.result;
            console.log('IndexedDB初始化成功');
            // 加载保存的游戏状态
            loadGameState().then(() => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        };
        
        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            
            // 创建投注记录存储
            if (!db.objectStoreNames.contains(STORE_BETTING_RECORDS)) {
                const bettingStore = db.createObjectStore(STORE_BETTING_RECORDS, { 
                    keyPath: 'id', 
                    autoIncrement: true 
                });
                bettingStore.createIndex('date', 'date', { unique: false });
                bettingStore.createIndex('prizeLevel', 'prizeLevel', { unique: false });
            }
            
            // 创建游戏状态存储
            if (!db.objectStoreNames.contains(STORE_GAME_STATE)) {
                db.createObjectStore(STORE_GAME_STATE, { keyPath: 'id' });
            }
        };
    });
}

// 保存投注记录到IndexedDB
function saveBettingRecord(record) {
    if (!db) return;
    
    const transaction = db.transaction([STORE_BETTING_RECORDS], 'readwrite');
    const store = transaction.objectStore(STORE_BETTING_RECORDS);
    
    const request = store.add(record);
    
    request.onsuccess = function() {
        console.log('投注记录保存成功');
    };
    
    request.onerror = function(event) {
        console.error('投注记录保存失败:', event.target.error);
    };
}

// 保存游戏状态到IndexedDB
function saveGameState() {
    return new Promise((resolve, reject) => {
        const gameState = {
            id: 1,
            currentDate: currentDate.toISOString(),
            totalCost: totalCost,
            totalWinnings: totalWinnings,
            winningStats: winningStats,
            userAge: userAge,
            initialUserAge: initialUserAge,
            initialDate: initialDate.toISOString(),
            purchaseCount: purchaseCount,
            achievements: achievements,
            redBallHistory: Array.from(redBallHistory),
            blueBallHistory: Array.from(blueBallHistory)
        };
        
        if (!db) {
            console.log('IndexedDB未初始化，使用localStorage作为备用方案');
            try {
                localStorage.setItem('doubleColorBallGameState', JSON.stringify(gameState));
                console.log('使用localStorage保存成功');
                resolve();
            } catch (error) {
                console.error('localStorage保存失败:', error);
                reject(error);
            }
            return;
        }
        
        const transaction = db.transaction([STORE_GAME_STATE], 'readwrite');
        const store = transaction.objectStore(STORE_GAME_STATE);
        
        const request = store.put(gameState);
        
        request.onsuccess = function() {
            console.log('游戏状态保存成功');
            resolve();
        };
        
        request.onerror = function(event) {
            console.error('游戏状态保存失败:', event.target.error);
            reject(event.target.error);
        };
    });
}

// 从IndexedDB加载游戏状态
function loadGameState() {
    return new Promise((resolve, reject) => {
        if (!db) {
            console.log('IndexedDB未初始化，尝试从localStorage加载');
            try {
                const savedData = localStorage.getItem('doubleColorBallGameState');
                if (savedData) {
                    const gameState = JSON.parse(savedData);
                    restoreGameState(gameState);
                    console.log('从localStorage加载成功');
                }
            } catch (error) {
                console.error('从localStorage加载失败:', error);
            }
            resolve();
            return;
        }
        
        const transaction = db.transaction([STORE_GAME_STATE], 'readonly');
        const store = transaction.objectStore(STORE_GAME_STATE);
        const request = store.get(1);
        
        request.onsuccess = function(event) {
            const gameState = event.target.result;
            if (gameState) {
                restoreGameState(gameState);
                console.log('从IndexedDB加载成功');
            } else {
                console.log('IndexedDB中没有保存的数据，尝试从localStorage加载');
                try {
                    const savedData = localStorage.getItem('doubleColorBallGameState');
                    if (savedData) {
                        const gameState = JSON.parse(savedData);
                        restoreGameState(gameState);
                        console.log('从localStorage加载成功');
                    }
                } catch (error) {
                    console.error('从localStorage加载失败:', error);
                }
            }
            resolve();
        };
        
        request.onerror = function(event) {
            console.error('从IndexedDB加载失败:', event.target.error);
            console.log('尝试从localStorage加载');
            try {
                const savedData = localStorage.getItem('doubleColorBallGameState');
                if (savedData) {
                    const gameState = JSON.parse(savedData);
                    restoreGameState(gameState);
                    console.log('从localStorage加载成功');
                }
            } catch (error) {
                console.error('从localStorage加载失败:', error);
            }
            resolve();
        };
    });
}

function restoreGameState(gameState) {
    currentDate = new Date(gameState.currentDate);
    totalCost = gameState.totalCost;
    totalWinnings = gameState.totalWinnings;
    winningStats = gameState.winningStats;
    userAge = gameState.userAge;
    initialUserAge = gameState.initialUserAge;
    initialDate = new Date(gameState.initialDate);
    purchaseCount = gameState.purchaseCount;
    
    updateDateDisplay();
    totalCostEl.textContent = formatNumber(totalCost);
    totalWinningsEl.textContent = formatNumber(totalWinnings);
    userAgeEl.textContent = userAge;
    purchaseCountEl.textContent = purchaseCount;
    
    firstPrizeCountEl.textContent = winningStats.first;
    secondPrizeCountEl.textContent = winningStats.second;
    thirdPrizeCountEl.textContent = winningStats.third;
    fourthPrizeCountEl.textContent = winningStats.fourth;
    fifthPrizeCountEl.textContent = winningStats.fifth;
    sixthPrizeCountEl.textContent = winningStats.sixth;
    
    // 恢复成就数据
    if (gameState.achievements) {
        achievements = gameState.achievements;
        updateAllAchievementsDisplay();
    }
    
    // 恢复红球历史
    if (gameState.redBallHistory && Array.isArray(gameState.redBallHistory)) {
        redBallHistory = new Set(gameState.redBallHistory);
    }
    
    // 恢复蓝球历史
    if (gameState.blueBallHistory && Array.isArray(gameState.blueBallHistory)) {
        blueBallHistory = new Set(gameState.blueBallHistory);
    }
    
    // 更新概率
    updatePrizeProbabilities();
    
    updateGameInfo();
    
    if (initialUserAge > 0) {
        ageVerificationPage.style.display = 'none';
        gamePage.style.display = 'block';
    }
}

// 清空IndexedDB中的所有数据
function clearAllData() {
    if (!db) return;
    
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_BETTING_RECORDS, STORE_GAME_STATE], 'readwrite');
        
        const bettingStore = transaction.objectStore(STORE_BETTING_RECORDS);
        const gameStore = transaction.objectStore(STORE_GAME_STATE);
        
        const clearBetting = bettingStore.clear();
        const clearGame = gameStore.clear();
        
        transaction.oncomplete = function() {
            console.log('所有数据清空成功');
            resolve();
        };
        
        transaction.onerror = function(event) {
            console.error('数据清空失败:', event.target.error);
            reject(event.target.error);
        };
    });
}

// 触发中奖特效
function triggerWinningEffect(prizeLevel) {
    if (!prizeLevel) return;
    
    const prizeNames = {
        first: '一等奖',
        second: '二等奖',
        third: '三等奖',
        fourth: '四等奖',
        fifth: '五等奖',
        sixth: '六等奖'
    };
    
    const prizeAmount = prizeAmounts[prizeLevel];
    
    // 如果是自动购买模式，只显示一、二、三等奖的特效
    if (isAutoBuying) {
        if (prizeLevel === 'first' || prizeLevel === 'second' || prizeLevel === 'third') {
            createConfetti();
            createNeonText(prizeNames[prizeLevel]);
        }
        return;
    }
    
    // 正常模式：一、二、三等奖：彩带 + 荧光字
    if (prizeLevel === 'first' || prizeLevel === 'second' || prizeLevel === 'third') {
        createConfetti();
        createNeonText(prizeNames[prizeLevel]);
    }
    // 四、五、六等奖：荧光字
    else {
        createNeonText(prizeNames[prizeLevel]);
    }
}

// 重置游戏函数
function resetGame() {
    const confirmReset = confirm('现有数据将全部清空(我还会开发其他网页应用,这个清空只清空本页面数据,千万不要清错了)，是否确认重置？');
    
    if (confirmReset) {
        clearAllData().then(() => {
            // 重置所有游戏状态变量
            currentDate = new Date();
            totalCost = 0;
            totalWinnings = 0;
            winningStats = {
                first: 0,
                second: 0,
                third: 0,
                fourth: 0,
                fifth: 0,
                sixth: 0
            };
            userAge = 0;
            initialUserAge = 0;
            initialDate = new Date();
            purchaseCount = 0;
            dataChanged = false;
            
            // 停止自动保存定时器
            stopAutoSave();
            
            // 显示年龄验证页面，隐藏游戏页面
            ageVerificationPage.style.display = 'block';
            gamePage.style.display = 'none';
            ageInput.value = '';
            ageError.textContent = '';
            
            // 启用所有按钮
            buyTicketBtn.disabled = false;
            autoFirstPrizeBtn.disabled = false;
            groupCountInput.disabled = false;
            noteCountInput.disabled = false;
            
            // 更新UI
            updateDateDisplay();
            totalCostEl.textContent = formatNumber(totalCost);
            totalWinningsEl.textContent = formatNumber(totalWinnings);
            userAgeEl.textContent = userAge;
            purchaseCountEl.textContent = purchaseCount;
            updateGameInfo();
            
            // 更新中奖统计
            firstPrizeCountEl.textContent = winningStats.first;
            secondPrizeCountEl.textContent = winningStats.second;
            thirdPrizeCountEl.textContent = winningStats.third;
            fourthPrizeCountEl.textContent = winningStats.fourth;
            fifthPrizeCountEl.textContent = winningStats.fifth;
            sixthPrizeCountEl.textContent = winningStats.sixth;
            
            // 更新概率
            updatePrizeProbabilities();
            
            // 清空结果显示
            redBallsResultEl.innerHTML = '';
            blueBallResultEl.innerHTML = '';
            ticketGroupsEl.innerHTML = '';
            
            alert('数据已成功重置');
        }).catch(error => {
            console.error('重置失败:', error);
            alert('重置失败，请重试');
        });
    }
}