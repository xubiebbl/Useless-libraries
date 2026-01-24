const buttonWeights = [
    20, 
    12, 
    3,  
    1,  
    6, 
    30, 
    20, 
    12, 
    40, 
    1,  
    30, 
    40, 
    20, 
    12, 
    40, 
    4,  
    30, 
    40, 
    20, 
    6,  
    40, 
    1,  
    30, 
    40  
];

const itemMultipliers = [
    { name: '橙子', isSmall: false, type: '橙子' },
    { name: '铃铛', isSmall: false, type: '铃铛' },
    { name: '60倍bar', isSmall: false, type: 'bar', multiplier: 60 },
    { name: '120倍bar', isSmall: false, type: 'bar', multiplier: 120 },
    { name: '30倍bar', isSmall: false, type: 'bar', multiplier: 30 },
    { name: '苹果', isSmall: false, type: '苹果' },
    { name: '芒果', isSmall: false, type: '芒果' },
    { name: '西瓜', isSmall: false, type: '西瓜' },
    { name: '小西瓜', isSmall: true, type: '西瓜' },
    { name: '银皇冠', isSmall: false, type: '银皇冠' },
    { name: '苹果', isSmall: false, type: '苹果' },
    { name: '小橙子', isSmall: true, type: '橙子' },
    { name: '橙子', isSmall: false, type: '橙子' },
    { name: '铃铛', isSmall: false, type: '铃铛' },
    { name: '小金条', isSmall: true, type: '金条' },
    { name: '金条', isSmall: false, type: '金条' },
    { name: '苹果', isSmall: false, type: '苹果' },
    { name: '小芒果', isSmall: true, type: '芒果' },
    { name: '芒果', isSmall: false, type: '芒果' },
    { name: '双星', isSmall: false, type: '双星' },
    { name: '小双星', isSmall: true, type: '双星' },
    { name: '金皇冠', isSmall: false, type: '金皇冠' },
    { name: '苹果', isSmall: false, type: '苹果' },
    { name: '小铃铛', isSmall: true, type: '铃铛' }
];

const images = [
    'img/橙子.png', //0
    'img/铃铛.png',//1
    'img/60bar.png',//2
    'img/120bar.png',//3
    'img/30bar.png',//4
    'img/苹果.png',//5
    'img/芒果.png', //6
    'img/西瓜.png',//7
    'img/小西瓜.png',//8
    'img/银皇冠.png',//9
    'img/苹果.png',//10
    'img/小橙子.png',//11
    'img/橙子.png',//12
    'img/铃铛.png',//13
    'img/小金条.png',//14
    'img/金条.png',//15
    'img/苹果.png',//16
    'img/小芒果.png',//17
    'img/芒果.png',//18
    'img/双星.png',//19
    'img/小双星.png',//20
    'img/金皇冠.png',//21
    'img/苹果.png',//22
    'img/小铃铛.png',//23
];

let imageIndex = 0;

const marqueeSound = new Audio('music/跑马灯音效.mp3');
const smallAppleSound = new Audio('music/小苹果音乐.mp3');

const selectSounds = [
    new Audio('music/下注 (1).mp3'),
    new Audio('music/下注 (2).mp3'),
    new Audio('music/下注 (3).mp3'),
    new Audio('music/下注 (4).mp3')
];

const itemSounds = {
    '苹果': new Audio('music/苹果.mp3'),
    '橙子': new Audio('music/橙子.mp3'),
    '芒果': new Audio('music/芒果.MP3'),
    '铃铛': new Audio('music/铃铛.mp3'),
    '西瓜': new Audio('music/西瓜.mp3'),
    '双星': new Audio('music/双星.mp3'),
    '金条': new Audio('music/金条.mp3'),
    '银皇冠': new Audio('music/皇冠.mp3'),
    '金皇冠': new Audio('music/皇冠.mp3'),
    '大满贯': new Audio('music/大满贯.mp3'),
    '双响炮': new Audio('music/双响炮.mp3'),
    '彩金': new Audio('music/彩金.mp3'),
    '大四喜': new Audio('music/大四喜.mp3'),
    '通通有奖': new Audio('music/通通有奖.mp3'),
    '小三元': new Audio('music/小三元.mp3'),
    '大三元': new Audio('music/大三元.mp3'),
    '开火车': new Audio('music/开火车.mp3'),
    '天女散花': new Audio('music/天女散花.mp3'),
    '传值': new Audio('music/转钱.mp3'),
    'coin': new Audio('music/大果coin03.mp3')
};

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const iconMap = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };

    const icon = document.createElement('span');
    icon.className = 'toast-icon';
    icon.textContent = iconMap[type] || iconMap.info;

    const messageSpan = document.createElement('span');
    messageSpan.className = 'toast-message';
    messageSpan.textContent = message;

    toast.appendChild(icon);
    toast.appendChild(messageSpan);
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

let slotGrid;
let startButton;
let bigButton;
let smallButton;
let leftmoveButton;
let rightmoveButton;
let threeRowGrid;
const buttons = [];

let isRunning = false;
let lastStopIndex = 0;
let isGuessingPhase = false;
let currentWinAmount = 0;
let hasWon = false;
let isWaitingForStart = false;
let poolDefaultValue = 0;
let poolCurrentDisplay = 0;
let isInnerCircleRunning = false;
let innerCircleAnimationId = null;
let innerCircleCurrentIndex = 0;
const innerCircleColors = ['glow-red', 'glow-green', 'glow-blue', 'glow-yellow'];

const koiFragments = {
    fragments: [false, false, false, false, false, false, false, false, false, false],
    achievements: {
        singleWinOver10000: false,
        bigWinOnce: false,
        trainTwice: 0,
        doubleCannonTwice: 0,
        flowerRainFourTimes: 0,
        bar120Twice: 0,
        crownTenTimes: 0,
        goldBarTenTimes: 0,
        apple300Times: 0,
        guessBigSmall50Times: 0,
        fourJoysTenTimes: 0,      // 大四喜10次计数器
        bigWinTwice: 0            // 大满贯2次计数器
    },
    allCollected: false,
    ultimateRewardClaimed: false
};

function initKoiFragments() {
    const savedFragments = localStorage.getItem('koiFragments');
    if (savedFragments) {
        const parsed = JSON.parse(savedFragments);
        koiFragments.fragments = parsed.fragments;
        koiFragments.achievements = parsed.achievements;
        koiFragments.allCollected = parsed.allCollected;
        koiFragments.ultimateRewardClaimed = parsed.ultimateRewardClaimed;
    }
    updateKoiFragmentsDisplay();
}

function saveKoiFragments() {
    localStorage.setItem('koiFragments', JSON.stringify(koiFragments));
}

function checkAndAwardKoiFragment(conditionIndex) {
    if (conditionIndex >= 0 && conditionIndex < 10 && !koiFragments.fragments[conditionIndex]) {
        koiFragments.fragments[conditionIndex] = true;
        saveKoiFragments();
        updateKoiFragmentsDisplay();
        showKoiFragmentAward(conditionIndex);
        
        checkAllFragmentsCollected();
    }
}

function showKoiFragmentAward(fragmentIndex) {
    const fragment = document.getElementById(`koiFragment${fragmentIndex}`);
    if (fragment) {
        fragment.style.opacity = '1';
        fragment.style.transform = 'scale(1.2)';
        setTimeout(() => {
            fragment.style.transform = 'scale(1)';
        }, 500);
    }
}

function getFlowerRainLampCount() {
    const rand = Math.random() * 100;
    if (rand < 35) return 2;
    if (rand < 60) return 3;
    if (rand < 75) return 4;
    if (rand < 85) return 5;
    if (rand < 92) return 6;
    return 7;
}

function getValidFlowerRainPositions(count, excludePositions) {
    const validPositions = [];
    const excludedTypes = ['bar', '金皇冠', '银皇冠', '金条'];
    
    for (let i = 0; i < itemMultipliers.length; i++) {
        const item = itemMultipliers[i];
        if (!excludedTypes.includes(item.type) && !excludePositions.includes(i)) {
            validPositions.push(i);
        }
    }
    
    const shuffled = validPositions.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

function showFlowerRainText() {
    const jinliLabel = document.getElementById('jinliLabel');
    if (!jinliLabel) return;
    
    const existingText = document.getElementById('flowerRainText');
    if (existingText) {
        existingText.remove();
    }
    
    const textDiv = document.createElement('div');
    textDiv.id = 'flowerRainText';
    textDiv.textContent = '天女散花';
    textDiv.style.position = 'absolute';
    textDiv.style.bottom = '-40px';
    textDiv.style.left = '0';
    textDiv.style.width = '100%';
    textDiv.style.textAlign = 'center';
    textDiv.style.fontSize = '24px';
    textDiv.style.fontWeight = 'bold';
    textDiv.style.color = '#ff69b4';
    textDiv.style.textShadow = '0 0 10px #ff1493, 0 0 20px #ff1493, 0 0 30px #ff1493';
    textDiv.style.zIndex = '101';
    textDiv.style.opacity = '0';
    textDiv.style.transition = 'opacity 0.5s ease';
    
    jinliLabel.appendChild(textDiv);
    
    setTimeout(() => {
        textDiv.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        textDiv.style.opacity = '0';
        setTimeout(() => {
            textDiv.remove();
        }, 500);
    }, 2000);
}

// 通用玩法特效显示函数（锦鲤容器显示）
function showGameplayEffect(text, duration = 3000, parentElement) {
    // 创建结果展示效果，作为锦鲤容器的子元素
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('neon-text-koi');
    resultDiv.textContent = text;
    parentElement.appendChild(resultDiv);
    
    // 自动移除
    setTimeout(() => {
        if (resultDiv.parentNode) {
            resultDiv.remove();
        }
    }, duration);
}

function executeFlowerRain() {
    if (isRunning) return;
    
    const lampCount = getFlowerRainLampCount();
    const positions = getValidFlowerRainPositions(lampCount, [lastStopIndex]);
    
    if (positions.length === 0) return;
    
    // 显示天女散花特效文字
    const jinliLabel = document.getElementById('jinliLabel');
    showGameplayEffect('天女散花', 3000, jinliLabel);
    
    if (itemSounds['天女散花']) {
        setTimeout(() => {
            itemSounds['天女散花'].currentTime = 0;
            itemSounds['天女散花'].play().catch(error => {
                console.log('天女散花音效播放失败:', error);
            });
        }, 200);
    }
    
    koiFragments.achievements.flowerRainFourTimes++;
    if (koiFragments.achievements.flowerRainFourTimes >= 4 && !koiFragments.fragments[4]) {
        checkAndAwardKoiFragment(4);
    }
    
    isRunning = true;
    startButton.disabled = true;
    
    // 天女散花动画参数
    const totalDuration = 4000 + Math.random() * 2000; // 4-6秒动画
    const startTime = performance.now();
    
    // 为每个位置创建独立的动画数据
    const animations = positions.map((pos, index) => {
        const currentIndex = lastStopIndex;
        // 每个灯旋转1-2圈到达目标位置
        const circles = 1 + Math.random(); // 1-2圈
        const steps = Math.floor(circles * 24) + (pos - currentIndex + 24) % 24;
        
        // 散花效果：灯逐个出现，间隔0.5-1秒
        const appearDelay = index * (500 + Math.random() * 500);
        
        return {
            targetPosition: pos,
            startIndex: currentIndex,
            totalSteps: steps,
            currentStep: 0,
            completed: false,
            colorIndex: index, // 每个灯分配固定颜色
            appearDelay: appearDelay, // 出现延迟
            hasAppeared: false // 是否已经显示
        };
    });
    
    // 天女散花专用柔和颜色（限制为4种花颜色）
    const flowerColors = ['glow-pink', 'glow-cyan', 'glow-yellow', 'glow-green'];
    
    function animateAll() {
        const elapsed = performance.now() - startTime;
        const overallProgress = Math.min(elapsed / totalDuration, 1);
        
        // 清除所有灯光效果（重新开始每帧）
        buttons.forEach(btn => {
            btn.classList.remove('glow-pink', 'glow-cyan', 'glow-yellow', 'glow-green', 'glow-orange', 'glow-magenta', 'glow-red', 'glow-blue', 'glow-100');
        });
        
        // 绘制每个散花灯
        let activeLights = 0;
        animations.forEach((anim, animIndex) => {
            // 检查是否到了该灯出现的时间
            const currentElapsed = elapsed - anim.appearDelay;
            if (currentElapsed < 0) {
                return; // 还没到这个灯出现的时间
            }
            
            if (!anim.hasAppeared) {
                anim.hasAppeared = true;
            }
            
            if (anim.completed) {
                // 已完成的灯保持在目标位置
                buttons[anim.targetPosition].classList.add(flowerColors[anim.colorIndex % flowerColors.length]);
                return;
            }
            
            // 计算当前进度（每个灯独立进度）
            const individualProgress = Math.min(currentElapsed / (totalDuration - anim.appearDelay), 1);
            const currentStep = Math.floor(individualProgress * anim.totalSteps);
            
            if (currentStep >= anim.totalSteps) {
                // 动画完成
                anim.completed = true;
                buttons[anim.targetPosition].classList.add(flowerColors[anim.colorIndex % flowerColors.length]);
                return;
            }
            
            // 计算当前位置
            const currentPos = (anim.startIndex + currentStep) % buttons.length;
            const colorClass = flowerColors[anim.colorIndex % flowerColors.length];
            
            // 只在当前位置显示灯光
            buttons[currentPos].classList.add(colorClass);
            activeLights++;
        });
        
        const allCompleted = animations.every(a => a.completed);
        
        if (allCompleted) {
            clearAllGlow();
            
            const thirdRowMultipliers = {
                'bar': 100,
                '金条': 40,
                '双星': 30,
                '西瓜': 20,
                '铃铛': 20,
                '芒果': 15,
                '橙子': 10,
                '苹果': 5
            };
            
            let totalWin = 0;
            let firstMultiplier = 0;
            
            // 使用增强版多灯逐个结算函数
            enhancedMultiLightSettlement(positions, '天女散花');
            
            if (totalWin >= 10000 && !koiFragments.achievements.singleWinOver10000) {
                koiFragments.achievements.singleWinOver10000 = true;
                checkAndAwardKoiFragment(0);
            }
            
            if (hasWon) {
                isGuessingPhase = true;
                isRunning = false;
                startButton.disabled = false;
            } else {
                setTimeout(() => {
                    isRunning = false;
                    startButton.disabled = false;
                    checkAndResetBets();
                }, 1000);
            }
        } else {
            requestAnimationFrame(animateAll);
        }
    }
    
    requestAnimationFrame(animateAll);
}

function checkFlowerRainTrigger(item) {
    if (isRunning) return;
    
    // 基础随机触发：2%概率
    const randomTrigger = Math.random() < 0.02;
    
    let fixedTrigger = false;
    // 金条/小金条：10%概率触发（降低原50%）
    if (item.name === '金条' || item.name === '小金条') {
        fixedTrigger = Math.random() < 0.1;
    } 
    // 120倍Bar物品：50%概率触发（保持）
    else if (item.name.includes('bar')) {
        fixedTrigger = Math.random() < 0.5;
    }
    
    if (randomTrigger || fixedTrigger) {
        setTimeout(() => {
            executeFlowerRain();
        }, 500);
    }
}

function updateKoiFragmentsDisplay() {
    for (let i = 0; i < 10; i++) {
        const fragment = document.getElementById(`koiFragment${i}`);
        if (fragment) {
            fragment.style.opacity = koiFragments.fragments[i] ? '1' : '0';
        }
    }
}

function checkAllFragmentsCollected() {
    const allCollected = koiFragments.fragments.every(f => f === true);
    if (allCollected && !koiFragments.allCollected) {
        koiFragments.allCollected = true;
        saveKoiFragments();
        showToast('恭喜！您已集齐所有锦鲤碎片！', 'success');
    }
}

function checkUltimateRewardEligible() {
    return koiFragments.allCollected && !koiFragments.ultimateRewardClaimed;
}

function claimUltimateReward() {
    if (!checkUltimateRewardEligible()) {
        showToast('您尚未集齐所有锦鲤碎片或已领取奖励！', 'warning');
        return;
    }
    
    const currentCredit = getCurrentCredit();
    if (currentCredit < 100000) {
        showToast('您的积分不足10万，无法兑换终极奖励！', 'warning');
        return;
    }
    
    if (confirm('确定要花费10万积分兑换终极奖励吗？')) {
        setCredit(currentCredit - 100000);
        koiFragments.ultimateRewardClaimed = true;
        saveKoiFragments();
        
        for (let i = 0; i < 10; i++) {
            const fragment = document.getElementById(`koiFragment${i}`);
            if (fragment) {
                fragment.style.opacity = '0';
            }
        }
        
        const jinliBase = document.getElementById('jinliBase');
        if (jinliBase) {
            jinliBase.src = 'img/锦鲤纳福.png';
        }
        
        startBackgroundAnimation();
        
        showToast('恭喜！您已成功兑换终极奖励！', 'success');
    }
}

let backgroundAnimationInterval;
function startBackgroundAnimation() {
    const jinliBase = document.getElementById('jinliBase');
    
    function toggleBackground() {
        if (jinliBase) {
            const currentSrc = jinliBase.src;
            if (currentSrc.includes('锦鲤纳福.png')) {
                jinliBase.style.opacity = '0';
                document.body.style.backgroundImage = "url('img/backgroud锦鲤.gif')";
                document.body.style.backgroundSize = "cover";
                document.body.style.backgroundPosition = "center";
            } else {
                jinliBase.style.opacity = '1';
                document.body.style.backgroundImage = "url('img/backgroud.png')";
                document.body.style.backgroundSize = "cover";
                document.body.style.backgroundPosition = "center";
            }
        }
    }
    
    toggleBackground();
    backgroundAnimationInterval = setInterval(toggleBackground, 60000);
}

function getWeightedRandomIndex() {
    const totalWeight = buttonWeights.reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;
    
    for (let i = 0; i < buttonWeights.length; i++) {
        random -= buttonWeights[i];
        if (random <= 0) {
            return i;
        }
    }
    
    return buttonWeights.length - 1;
}

function getNextImage() {
    const img = images[imageIndex];
    imageIndex = (imageIndex + 1) % images.length;
    return img;
}

function getClockwiseOrder(row, col) {
    if (row === 0) return col;
    if (col === 6) return 6 + row;
    if (row === 6) return 6 + 6 + (6 - col);
    if (col === 0) return 6 + 6 + 6 + (6 - row);
    return 0;
}

function getButtonIndexByPosition(position) {
    // 将结算系统的位置(0-23)映射到正确的按钮索引
    
    // 使用与getClockwiseOrder完全一致的逻辑
    let targetRow, targetCol;
    
    if (position >= 0 && position <= 6) {
        // 顶行: 0-6
        targetRow = 0;
        targetCol = position;
    } else if (position >= 7 && position <= 12) {
        // 右列: 7-12
        targetRow = position - 6;
        targetCol = 6;
    } else if (position >= 13 && position <= 17) {
        // 底行: 13-17 (逆向) - 13→5, 14→4, 15→3, 16→2, 17→1
        targetRow = 6;
        targetCol = 18 - position;
    } else if (position === 18) {
        // 底行最后一个: 18→0
        targetRow = 6;
        targetCol = 0;
    } else if (position >= 19 && position <= 23) {
        // 左列: 19-23 (逆向) - 19→5, 20→4, 21→3, 22→2, 23→1
        targetRow = 6 - (position - 18);  // 修正: 19→5, 20→4, 21→3, 22→2, 23→1
        targetCol = 0;
    }
    
    // 在按钮数组中找到对应的按钮
    for (let i = 0; i < buttons.length; i++) {
        const row = parseInt(buttons[i].dataset.row);
        const col = parseInt(buttons[i].dataset.col);
        if (row === targetRow && col === targetCol) {
            return i;
        }
    }
    return 0; // 默认返回第一个
}


function incrementNumber(col) {
    const numberDivs = threeRowGrid.querySelectorAll('.row-number');
    const targetDiv = numberDivs[col];
    let currentValue = parseInt(targetDiv.textContent);
    
    const currentCredit = getCurrentCredit();
    
    if (currentCredit > 0 && currentValue < 99) {
        targetDiv.textContent = currentValue + 1;
        const newCredit = currentCredit - 1;
        setCredit(newCredit);
        
        const soundIndex = col % 4;
        selectSounds[soundIndex].currentTime = 0;
        selectSounds[soundIndex].play().catch(error => {
            console.log('下注音效播放失败:', error);
        });
    }
}

function createCoin(startX, startY) {
    const coin = document.createElement('div');
    coin.className = 'coin';
    document.body.appendChild(coin);

    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.8;
    const distance = 250 + Math.random() * 200;
    const endX = startX + Math.cos(angle) * distance;
    const endY = startY + Math.sin(angle) * distance;
    const peakHeight = -(50 + Math.random() * 150);

    coin.style.left = startX + 'px';
    coin.style.top = startY + 'px';

    const duration = 2000;
    const startTime = performance.now();

    function animateCoin(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const currentX = startX + (endX - startX) * progress;
        const parabolicY = -4 * peakHeight * progress * (progress - 1);
        const currentY = startY + (endY - startY) * progress + parabolicY;

        coin.style.left = currentX + 'px';
        coin.style.top = currentY + 'px';
        coin.style.opacity = 1 - progress * 0.5;

        if (progress < 1) {
            requestAnimationFrame(animateCoin);
        } else {
            coin.remove();
        }
    }

    requestAnimationFrame(animateCoin);
}

function startMarquee() {
    if (isRunning) return;

    if (isGuessingPhase) {
        skipGuessingPhase();
        return;
    }

    if (isWaitingForStart) {
        animateWinToCredit(() => {
            isWaitingForStart = false;
            isRunning = false;
            hasWon = false;
            currentWinAmount = 0;

            checkAndResetBets();
        });
        return;
    }

    if (checkUltimateRewardEligible()) {
        const currentCredit = getCurrentCredit();
        if (currentCredit >= 100000) {
            if (confirm('您已集齐所有锦鲤碎片且积分超过10万，是否愿意花费10万积分兑换终极奖励？')) {
                claimUltimateReward();
                return;
            }
        }
    }

    // 开始新游戏前清理所有效果
    clearAllEffects();

    updatePoolDisplay(poolDefaultValue);

    const winValueText = getWin();
    const currentWin = parseInt(winValueText.replace(/,/g, ''));

    const numberDivs = threeRowGrid.querySelectorAll('.row-number');
    let totalBet = 0;
    numberDivs.forEach(div => {
        totalBet += parseInt(div.textContent);
    });

    if (totalBet === 0) {
        showToast('请先下注', 'warning');
        return;
    }

    isRunning = true;
    startButton.disabled = true;

    const totalDuration = 3000 + Math.random() * 5000;
    const stopPosition = getWeightedRandomIndex();
    const minSteps = buttons.length * 2;
    const maxSteps = minSteps + stopPosition;

    let currentIndex = lastStopIndex;
    let steps = 0;
    const startTime = performance.now();
    let isDecelerating = false;

    smallAppleSound.currentTime = 0;
    smallAppleSound.play().catch(error => {
        console.log('小苹果音效播放失败:', error);
    });

    startInnerCircleGlow();

    function animate() {
        if (steps >= maxSteps) {
            smallAppleSound.pause();
            smallAppleSound.currentTime = 0;
            marqueeSound.currentTime = 0;
            marqueeSound.play().catch(error => {
                console.log('跑马灯音效播放失败:', error);
            });
            setTimeout(() => {
                finishMarquee(currentIndex);
            }, 100);
            return;
        }

        clearAllGlow();

        const current = buttons[currentIndex];
        current.classList.add('glow-100');

        currentIndex = (currentIndex + 1) % buttons.length;
        steps++;

        const progress = steps / maxSteps;
        const speedMultiplier = getSpeedMultiplier(progress);
        const baseDelay = (totalDuration / maxSteps) / 2;
        const delay = baseDelay * speedMultiplier;

        if (progress > 0.80) {
            isDecelerating = true;
            smallAppleSound.pause();
            smallAppleSound.currentTime = 0;
            marqueeSound.currentTime = 0;
            marqueeSound.play().catch(error => {
                console.log('跑马灯音效播放失败:', error);
            });
        }

        setTimeout(animate, delay);
    }

    animate();
}

function getSpeedMultiplier(progress) {
    const accelerationPhase = 0.1;
    const decelerationPhase = 0.7;

    if (progress < accelerationPhase) {
        const p = progress / accelerationPhase;
        return 3 - 2 * p;
    } else if (progress > decelerationPhase) {
        const p = (progress - decelerationPhase) / (1 - decelerationPhase);
        return 1 + 5 * p;
    } else {
        return 1;
    }
}

function startInnerCircleGlow() {
    const floatingItems = document.querySelectorAll('.floating-item');
    let currentIndex = 0;
    
    if (innerCircleAnimationId) {
        clearInterval(innerCircleAnimationId);
    }
    
    floatingItems.forEach((item, index) => {
        const colorIndex = index % 4;
        item.classList.add(innerCircleColors[colorIndex]);
    });
    
    innerCircleAnimationId = setInterval(() => {
        floatingItems.forEach((item, index) => {
            const colorIndex = (index + currentIndex) % 4;
            item.classList.remove(...innerCircleColors);
            item.classList.add(innerCircleColors[colorIndex]);
        });
        
        currentIndex = (currentIndex + 1) % 4;
    }, 200);
}

function stopInnerCircleGlow() {
    if (innerCircleAnimationId) {
        clearInterval(innerCircleAnimationId);
        innerCircleAnimationId = null;
    }
    
    const floatingItems = document.querySelectorAll('.floating-item');
    floatingItems.forEach((item, index) => {
        item.classList.remove(...innerCircleColors);
    });
}

function clearAllGlow() {
    buttons.forEach(btn => {
        btn.classList.remove('glow-100', 'glow-60', 'glow-30');
    });
}

function finishMarquee(finalIndex) {
    clearAllGlow();
    stopInnerCircleGlow();
    const finalButton = buttons[finalIndex];
    finalButton.classList.add('glow-100');
    lastStopIndex = (finalIndex + 1) % buttons.length;
    
    const item = itemMultipliers[finalIndex];
    let soundName = item.name;
    if (item.isSmall) {
        if (item.type === '橙子') soundName = '橙子';
        else if (item.type === '西瓜') soundName = '西瓜';
        else if (item.type === '芒果') soundName = '芒果';
        else if (item.type === '双星') soundName = '双星';
        else if (item.type === '金条') soundName = '金条';
        else if (item.type === '铃铛') soundName = '铃铛';
    }
    if (itemSounds[soundName]) {
        setTimeout(() => {
            itemSounds[soundName].currentTime = 0;
            itemSounds[soundName].play().catch(error => {
                console.log(soundName + '音效播放失败:', error);
            });
        }, 200);
    }
    
    const thirdRowMultipliers = {
        'bar': 100,
        '金条': 40,
        '双星': 30,
        '西瓜': 20,
        '铃铛': 20,
        '芒果': 15,
        '橙子': 10,
        '苹果': 5
    };

    const numberDivs = threeRowGrid.querySelectorAll('.row-number');
    let totalWin = 0;

    if (item.name === '银皇冠' || item.name === '金皇冠') {
        totalWin = 0;
        isGuessingPhase = true;
        isRunning = false;
        startButton.disabled = false;
        startInnerCircleMarquee();
        
        if (itemSounds[item.name]) {
            setTimeout(() => {
                itemSounds[item.name].currentTime = 0;
                itemSounds[item.name].play().catch(error => {
                    console.log(item.name + '音效播放失败:', error);
                });
            }, 200);
        }
    } else if (item.isSmall) {
        numberDivs.forEach((div, index) => {
            const bet = parseInt(div.textContent);
            if (bet > 0 && item.type === Object.keys(thirdRowMultipliers)[index]) {
                totalWin += 3 * bet;
            }
        });
    } else if (item.name === '60倍bar') {
        numberDivs.forEach((div, index) => {
            const bet = parseInt(div.textContent);
            if (bet > 0 && item.type === Object.keys(thirdRowMultipliers)[index]) {
                totalWin += 60 * bet;
            }
        });
        
        if (totalWin > 0) {
            animatePoolIncrement(60, item);
        }
    } else if (item.name === '120倍bar') {
        numberDivs.forEach((div, index) => {
            const bet = parseInt(div.textContent);
            if (bet > 0 && item.type === Object.keys(thirdRowMultipliers)[index]) {
                totalWin += 120 * bet;
            }
        });
        
        if (totalWin > 0) {
            animatePoolIncrement(120, item);
        }
    } else if (item.name === '30倍bar') {
        numberDivs.forEach((div, index) => {
            const bet = parseInt(div.textContent);
            if (bet > 0 && item.type === Object.keys(thirdRowMultipliers)[index]) {
                totalWin += 30 * bet;
            }
        });
        
        if (totalWin > 0) {
            animatePoolIncrement(30, item);
        }
    } else {
        const multiplier = getMultiplierForItem(item.type);
        numberDivs.forEach((div, index) => {
            const bet = parseInt(div.textContent);
            if (bet > 0 && item.type === Object.keys(thirdRowMultipliers)[index]) {
                totalWin += multiplier * bet;
            }
        });
        
        if (totalWin > 0) {
            if ((item.name === '橙子' || item.name === '芒果' || item.name === '铃铛') && 
                (multiplier === 10 || multiplier === 20)) {
                animatePoolIncrement(multiplier, item);
            } else if ((item.name === '西瓜' || item.name === '双星' || item.name === '金条') && 
                (multiplier === 20 || multiplier === 40)) {
                animatePoolIncrement(multiplier, item);
            } else {
                updatePoolDisplay(multiplier);
            }
        }
    }

    const currentWinValue = parseInt(getWin().replace(/,/g, ''));
    const newWinValue = currentWinValue + totalWin;
    setWin(newWinValue);
    currentWinAmount = newWinValue;
    hasWon = totalWin > 0;

    // 如果是大水果（非小水果且非皇冠）且中奖，飞出钱币
    if (!item.isSmall && !item.name.includes('皇冠') && totalWin > 0) {
        const finalButton = buttons[finalIndex];
        const rect = finalButton.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const coinCount = Math.floor(Math.random() * 10) + 1; // 1-10个钱币
        setTimeout(() => {
            for (let i = 0; i < coinCount; i++) {
                setTimeout(() => {
                    createCoin(centerX, centerY);
                }, i * 100);
            }
        }, 500);
    }

    if (totalWin >= 10000 && !koiFragments.achievements.singleWinOver10000) {
        koiFragments.achievements.singleWinOver10000 = true;
        checkAndAwardKoiFragment(0);
    }

    if (item.name === '120倍bar' && totalWin > 0) {
        koiFragments.achievements.bar120Twice++;
        if (koiFragments.achievements.bar120Twice >= 2 && !koiFragments.fragments[5]) {
            checkAndAwardKoiFragment(5);
        }
    }

    if (item.name === '金皇冠' || item.name === '银皇冠') {
        koiFragments.achievements.crownTenTimes++;
        if (koiFragments.achievements.crownTenTimes >= 10 && !koiFragments.fragments[6]) {
            checkAndAwardKoiFragment(6);
        }
    }

    if (item.name === '金条' && totalWin > 0) {
        koiFragments.achievements.goldBarTenTimes++;
        if (koiFragments.achievements.goldBarTenTimes >= 10 && !koiFragments.fragments[7]) {
            checkAndAwardKoiFragment(7);
        }
    }

    if (item.name === '苹果' && totalWin > 0) {
        koiFragments.achievements.apple300Times++;
        if (koiFragments.achievements.apple300Times >= 300 && !koiFragments.fragments[8]) {
            checkAndAwardKoiFragment(8);
        }
    }

    checkFlowerRainTrigger(item);

    if (hasWon) {
        isGuessingPhase = true;
        isRunning = false;
        startButton.disabled = false;
    } else {
        setTimeout(() => {
            isRunning = false;
            startButton.disabled = false;
            
            checkAndResetBets();
        }, 1000);
    }
}

function checkAndResetBets() {
    const currentCredit = getCurrentCredit();

    const numberDivs = threeRowGrid.querySelectorAll('.row-number');
    let totalBet = 0;
    numberDivs.forEach(div => {
        totalBet += parseInt(div.textContent);
    });

    if (currentCredit >= totalBet) {
        const newCredit = currentCredit - totalBet;
        setCredit(newCredit);
    } else {
        numberDivs.forEach(div => {
            div.textContent = '0';
        });
    }
}

function animateWinToCredit(callback, finalCreditValue = null) {
    const currentWin = parseInt(getWin().replace(/,/g, ''));
    const currentCredit = getCurrentCredit();
    
    const finalCredit = finalCreditValue !== null ? finalCreditValue : currentCredit + currentWin;
    const duration = 500;
    const startTime = performance.now();
    
    if (itemSounds['传值'] && currentWin > 0) {
        itemSounds['传值'].currentTime = 0;
        itemSounds['传值'].play().catch(error => {
            console.log('传值音效播放失败:', error);
        });
    }
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentWinValue = Math.round(currentWin * (1 - progress));
        const currentCreditValue = currentCredit + Math.round(currentWin * progress);
        
        setWin(currentWinValue);
        setCredit(currentCreditValue);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            setWin(0);
            setCredit(finalCredit);
            
            if (callback) {
                callback();
            }
        }
    }
    
    requestAnimationFrame(animate);
}

function insertCoin() {
    const currentCredit = getCurrentCredit();
    const newCredit = currentCredit + 10;
    setCredit(newCredit);
}

function skipGuessingPhase() {
    isGuessingPhase = false;
    startButton.disabled = false;
    
    // 直接执行传值动画
    animateWinToCredit(() => {
        isWaitingForStart = false;
        isRunning = false;
        hasWon = false;
        currentWinAmount = 0;
        checkAndResetBets();
    });
}

function playGuessingAnimation(userChoice) {
    const currentWin = parseInt(getWin().replace(/,/g, ''));
    if (currentWin <= 0) return;
    if (isRunning) return;
    
    isGuessingPhase = true;
    isRunning = true;
    
    const jfLabels = [
        document.getElementById('jf0'),
        document.getElementById('jf1'),
        document.getElementById('jf2'),
        document.getElementById('jf3')
    ];
    
    if (!jfLabels[0] || !jfLabels[1] || !jfLabels[2] || !jfLabels[3]) return;
    
    let currentIndex = 0;
    const totalFlips = 20;
    let flips = 0;
    
    const flipInterval = setInterval(() => {
        const randomNum = Math.floor(Math.random() * 13) + 1;
        const digits = [
            Math.floor(randomNum / 1000) % 10,
            Math.floor(randomNum / 100) % 10,
            Math.floor(randomNum / 10) % 10,
            randomNum % 10
        ];
        
        jfLabels[0].src = 'img/jf' + digits[0] + '.png';
        jfLabels[1].src = 'img/jf' + digits[1] + '.png';
        jfLabels[2].src = 'img/jf' + digits[2] + '.png';
        jfLabels[3].src = 'img/jf' + digits[3] + '.png';
        
        flips++;
        
        if (flips >= totalFlips) {
            clearInterval(flipInterval);
            
            const finalNumber = Math.floor(Math.random() * 13) + 1;
            const digits = [
                Math.floor(finalNumber / 1000) % 10,
                Math.floor(finalNumber / 100) % 10,
                Math.floor(finalNumber / 10) % 10,
                finalNumber % 10
            ];
                
            jfLabels[0].src = 'img/jf' + digits[0] + '.png';
            jfLabels[1].src = 'img/jf' + digits[1] + '.png';
            jfLabels[2].src = 'img/jf' + digits[2] + '.png';
            jfLabels[3].src = 'img/jf' + digits[3] + '.png';
            
            if (finalNumber === 7) {
                setTimeout(() => {
                    const multiplier = Math.floor(Math.random() * 3) + 2;
                    
                    const multiplierDigits = [0, 0, 0, multiplier];
                    jfLabels[0].src = 'img/jf' + multiplierDigits[0] + '.png';
                    jfLabels[1].src = 'img/jf' + multiplierDigits[1] + '.png';
                    jfLabels[2].src = 'img/jf' + multiplierDigits[2] + '.png';
                    jfLabels[3].src = 'img/jf' + multiplierDigits[3] + '.png';
                    
                    setTimeout(() => {
                        const currentWinValue = parseInt(getWin().replace(/,/g, ''));
                        const newWinValue = currentWinValue * multiplier;
                        setWin(newWinValue);
                        currentWinAmount = newWinValue;
                        
                        isGuessingPhase = false;
                        isRunning = false;
                        isWaitingForStart = true;
                        startButton.disabled = false;
                    }, 1000);
                }, 2000);
            } else {
                const finalChoice = finalNumber <= 6 ? '小' : '大';
                
                if (userChoice === finalChoice) {
                    const currentWinValue = parseInt(getWin().replace(/,/g, ''));
                    const newWinValue = currentWinValue * 2;
                    setWin(newWinValue);
                    currentWinAmount = newWinValue;
                    
                    koiFragments.achievements.guessBigSmall50Times++;
                    if (koiFragments.achievements.guessBigSmall50Times >= 50 && !koiFragments.fragments[9]) {
                        checkAndAwardKoiFragment(9);
                    }
                    
                    isGuessingPhase = false;
                    isRunning = false;
                    isWaitingForStart = true;
                    startButton.disabled = false;
                    
                    const centerDisplay = document.getElementById('centerDisplay');
                    const rect = centerDisplay.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2 - 30;
                    
                    setTimeout(() => {
                        for (let i = 0; i < 10; i++) {
                            setTimeout(() => {
                                createCoin(centerX, centerY);
                            }, i * 100);
                        }
                    }, 500);
                } else {
                    setWin(0);
                    currentWinAmount = 0;
                    
                    isGuessingPhase = false;
                    isRunning = false;
                    isWaitingForStart = false;
                    hasWon = false;
                    
                    checkAndResetBets();
                }
            }
        }
    }, 100);
}

function getCurrentCredit() {
    const creditValueText = document.getElementById('creditValue').textContent;
    return parseInt(creditValueText.replace(/,/g, ''));
}

function setCredit(value) {
    document.getElementById('creditValue').textContent = formatNumber(value);
}

function getWin() {
    const winValueText = document.getElementById('winValue').textContent;
    return winValueText;
}

function setWin(value) {
    document.getElementById('winValue').textContent = formatNumber(value);
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function initPoolDisplay() {
    const savedPoolValue = localStorage.getItem('poolDefaultValue');
    if (savedPoolValue) {
        poolDefaultValue = parseInt(savedPoolValue);
    } else {
        poolDefaultValue = weightedRandomPoolValue();
        localStorage.setItem('poolDefaultValue', poolDefaultValue);
    }
    poolCurrentDisplay = poolDefaultValue;
    updatePoolDisplay(poolDefaultValue);
}

function updatePoolDisplay(value) {
    const digits = [
        Math.floor(value / 1000) % 10,
        Math.floor(value / 100) % 10,
        Math.floor(value / 10) % 10,
        value % 10
    ];
    
    const jfLabels = [
        document.getElementById('jf0'),
        document.getElementById('jf1'),
        document.getElementById('jf2'),
        document.getElementById('jf3')
    ];
    
    if (jfLabels[0]) jfLabels[0].src = 'img/jf' + digits[0] + '.png';
    if (jfLabels[1]) jfLabels[1].src = 'img/jf' + digits[1] + '.png';
    if (jfLabels[2]) jfLabels[2].src = 'img/jf' + digits[2] + '.png';
    if (jfLabels[3]) jfLabels[3].src = 'img/jf' + digits[3] + '.png';
}

function animatePoolIncrement(targetMultiplier, item) {
    console.log('animatePoolIncrement 被调用，目标倍率:', targetMultiplier, '物品:', item);
    
    const jfLabels = [
        document.getElementById('jf0'),
        document.getElementById('jf1'),
        document.getElementById('jf2'),
        document.getElementById('jf3')
    ];
    
    if (!jfLabels[0]) {
        console.log('jfLabels 未找到');
        return;
    }
    
    let currentValue = 0;
    
    // 根据倍率动态调整滚动速度
    let incrementSpeed;
    if (targetMultiplier <= 20) {
        incrementSpeed = 100;
    } else if (targetMultiplier <= 40) {
        incrementSpeed = 80;
    } else if (targetMultiplier <= 60) {
        incrementSpeed = 60;
    } else {
        incrementSpeed = 50;
    }
    
    console.log('开始逐次增加动画，从 0 到', targetMultiplier, '速度:', incrementSpeed, 'ms/次');
    
    const incrementInterval = setInterval(() => {
        if (currentValue >= targetMultiplier) {
            clearInterval(incrementInterval);
            updatePoolDisplay(targetMultiplier);
            console.log('逐次增加动画完成，最终值:', targetMultiplier);
            return;
        }
        
        currentValue++;
        updatePoolDisplay(currentValue);
        console.log('当前值:', currentValue);
        
        if (itemSounds['coin']) {
            itemSounds['coin'].currentTime = 0;
            itemSounds['coin'].play().catch(error => {
                console.log('coin音效播放失败:', error);
            });
        }
    }, incrementSpeed);
}

function animatePoolAndWin(poolValue, winValue, duration) {
    const steps = 50;
    const stepDuration = duration / steps;
    const poolStep = poolValue / steps;
    const winStep = winValue / steps;
    
    let currentPool = poolCurrentDisplay;
    let currentWin = parseInt(getWin().replace(/,/g, ''));
    
    let step = 0;
    
    window.currentAnimationInterval = setInterval(() => {
        step++;
        currentPool -= poolStep;
        currentWin += winStep;
        
        updatePoolDisplay(Math.floor(currentPool));
        setWin(Math.floor(currentWin));
        
        if (step >= steps) {
            clearInterval(interval);
            updatePoolDisplay(0);
            poolCurrentDisplay = 0;
            
            // 彩金结束后，生成新的默认值
            setTimeout(() => {
                poolDefaultValue = weightedRandomPoolValue();
                localStorage.setItem('poolDefaultValue', poolDefaultValue);
                poolCurrentDisplay = poolDefaultValue;
                updatePoolDisplay(poolDefaultValue);
            }, 500);
        }
    }, stepDuration);
}

// 彩金数字递减动画函数
function animateColorGoldDecrement(poolValue, currentWinValue, duration) {
    const steps = 100; // 100步，每步100ms，总共10秒
    const stepDuration = duration / steps;
    const decrementStep = poolValue / steps; // 每步减少的值
    const incrementStep = poolValue / steps; // 每步增加的值（全部给win）
    
    let currentPool = poolValue; // 当前积分池数值
    let currentWin = currentWinValue; // 当前win值
    
    let step = 0;
    
    window.currentAnimationInterval = setInterval(() => {
        step++;
        
        // 积分池递减
        currentPool -= decrementStep;
        if (currentPool < 0) currentPool = 0;
        
        // win值递增（接收积分池的值）
        currentWin += incrementStep;
        
        // 更新显示
        updatePoolDisplay(Math.floor(currentPool));
        setWin(Math.floor(currentWin));
        
        // 更新全局变量
        poolCurrentDisplay = Math.floor(currentPool);
        
        if (step >= steps) {
            clearInterval(window.currentAnimationInterval);
            window.currentAnimationInterval = null;
            
            // 确保最终值正确
            updatePoolDisplay(0);
            setWin(currentWinValue + poolValue);
            poolCurrentDisplay = 0;
            
            // 彩金结束后，生成新的默认值
            setTimeout(() => {
                poolDefaultValue = weightedRandomPoolValue();
                localStorage.setItem('poolDefaultValue', poolDefaultValue);
                poolCurrentDisplay = poolDefaultValue;
                updatePoolDisplay(poolDefaultValue);
            }, 500);
        }
    }, stepDuration);
}

function getMultiplierForItem(itemName) {
    if (itemName === '苹果') {
        return Math.random() < 0.7 ? 5 : 6;
    }
    if (itemName === '橙子' || itemName === '芒果' || itemName === '铃铛') {
        return Math.random() < 0.7 ? 10 : 20;
    }
    if (itemName === '西瓜' || itemName === '双星' || itemName === '金条') {
        return Math.random() < 0.7 ? 20 : 40;
    }
    return 3;
}



// 增强版多灯逐个结算函数，包含按钮缩放效果和积分池倍率显示
function enhancedMultiLightSettlement(positions, gameType) {
    let totalWin = 0;
    
    // 逐个结算每个灯，每个灯2秒
    positions.forEach((pos, index) => {
        setTimeout(() => {
            const result = calculatePositionWinWithMultiplier(pos);
            const { win, multiplier, item } = result;
            
            // 更新总奖励
            if (win > 0) {
                const currentWinValue = parseInt(getWin().replace(/,/g, ''));
                setWin(currentWinValue + win);
                totalWin += win;
            }
            
            // 按钮缩放动画（最大1.1倍）
            const buttonIndex = getButtonIndexByPosition(pos);
            animateButtonScale(buttons[buttonIndex], 2000);
            
            // 如果是大水果（非小水果且非皇冠），飞出钱币
            if (!item.isSmall && !item.name.includes('皇冠') && win > 0) {
                const button = buttons[buttonIndex];
                const rect = button.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const coinCount = Math.floor(Math.random() * 10) + 1; // 1-10个钱币
                setTimeout(() => {
                    for (let i = 0; i < coinCount; i++) {
                        setTimeout(() => {
                            createCoin(centerX, centerY);
                        }, i * 100);
                    }
                }, 500);
            }
            
            // 积分池显示当前倍率（使用jf*.png图片）
            console.log('结算信息:', { item: item.name, multiplier: multiplier, type: item.type });
            
            if ((item.name === '橙子' || item.name === '芒果' || item.name === '铃铛') && 
                (multiplier === 10 || multiplier === 20)) {
                console.log('触发逐次增加动画，倍率:', multiplier);
                animatePoolIncrement(multiplier, item);
            } else if ((item.name === '西瓜' || item.name === '双星' || item.name === '金条') && 
                (multiplier === 20 || multiplier === 40)) {
                console.log('触发逐次增加动画，倍率:', multiplier);
                animatePoolIncrement(multiplier, item);
            } else {
                updatePoolDisplay(multiplier);
            }
            
            // 最后一个灯结算完成后
            if (index === positions.length - 1) {
                setTimeout(() => {
                    // 重置状态
                    isRunning = false;
                    isGuessingPhase = false;
                    isWaitingForStart = true;
                    startButton.disabled = false;
                }, 2000);
            }
        }, index * 2000); // 每个灯间隔2秒
    });
}

// 计算位置奖励并返回倍率信息的增强版函数
function calculatePositionWinWithMultiplier(positionIndex) {
    const item = itemMultipliers[positionIndex];
    const numberDivs = threeRowGrid.querySelectorAll('.row-number');
    
    const thirdRowMultipliers = {
        'bar': 100,
        '金条': 40,
        '双星': 30,
        '西瓜': 20,
        '铃铛': 20,
        '芒果': 15,
        '橙子': 10,
        '苹果': 5
    };
    
    let multiplier;
    if (item.name.includes('bar')) {
        multiplier = item.multiplier || 30;
    } else if (item.isSmall) {
        multiplier = 3;
    } else {
        multiplier = getMultiplierForItem(item.type);
    }
    
    const betIndex = Object.keys(thirdRowMultipliers).indexOf(item.type);
    let win = 0;
    
    if (betIndex >= 0) {
        const bet = parseInt(numberDivs[betIndex].textContent);
        
        if (bet > 0) {
            win = multiplier * bet;
        }
    }
    
    return {
        win: win,
        multiplier: multiplier,
        item: item
    };
}

// 按钮缩放动画函数
function animateButtonScale(button, duration = 2000) {
    const keyframes = [
        { transform: 'scale(1.0)' },
        { transform: 'scale(1.2)' },
        { transform: 'scale(0.95)' },
        { transform: 'scale(1.05)' },
        { transform: 'scale(1.0)' }
    ];
    const options = {
        duration: duration,
        iterations: 1,
        easing: 'ease-in-out'
    };
    
    if (button && button.animate) {
        button.animate(keyframes, options);
    }
}


function startInnerCircleMarquee() {
    isInnerCircleRunning = true;
    
    const floatingItems = document.querySelectorAll('.floating-item');
    let currentIndex = 0;
    const totalRounds = 5;
    let rounds = 0;
    const speed = 110;
    
    const innerCircleWeights = [
        { name: '大满贯', weight: 1 },
        { name: '双响炮', weight: 10 },
        { name: '彩金', weight: 5 },
        { name: '大四喜', weight: 5 },
        { name: '通通有奖', weight: 5 },
        { name: '小三元', weight: 40 },
        { name: '大三元', weight: 30 },
        { name: '开火车', weight: 4 }
    ];
    
    const totalWeight = innerCircleWeights.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    let selectedPrize = '';
    
    for (const item of innerCircleWeights) {
        random -= item.weight;
        if (random <= 0) {
            selectedPrize = item.name;
            break;
        }
    }
    
    const marqueeInterval = setInterval(() => {
        floatingItems.forEach((item, index) => {
            item.classList.remove(...innerCircleColors);
        });
        
        const colorIndex = currentIndex % 4;
        floatingItems[currentIndex].classList.add(innerCircleColors[colorIndex]);
        
        currentIndex = (currentIndex + 1) % 8;
        
        if (currentIndex === 0) {
            rounds++;
            if (rounds >= totalRounds) {
                clearInterval(marqueeInterval);
                
                let stopIndex = 0;
                switch (selectedPrize) {
                    case '大满贯': stopIndex = 0; break;
                    case '双响炮': stopIndex = 1; break;
                    case '彩金': stopIndex = 2; break;
                    case '大四喜': stopIndex = 3; break;
                    case '通通有奖': stopIndex = 4; break;
                    case '小三元': stopIndex = 5; break;
                    case '大三元': stopIndex = 6; break;
                    case '开火车': stopIndex = 7; break;
                }
                
                floatingItems.forEach((item, index) => {
                    item.classList.remove(...innerCircleColors);
                });
                const finalColorIndex = stopIndex % 4;
                floatingItems[stopIndex].classList.add(innerCircleColors[finalColorIndex]);
                
                setTimeout(() => {
                    executeInnerCirclePrize(selectedPrize);
                }, 500);
            }
        }
    }, speed);
}

function executeInnerCirclePrize(prizeName) {
    isInnerCircleRunning = false;
    
    if (itemSounds[prizeName]) {
        setTimeout(() => {
            itemSounds[prizeName].currentTime = 0;
            itemSounds[prizeName].play().catch(error => {
                console.log(prizeName + '音效播放失败:', error);
            });
        }, 200);
    }
    
    const jinliLabel = document.getElementById('jinliLabel');
    showGameplayEffect(prizeName, 3000, jinliLabel);
    
    // 飞出20个元宝
    const centerDisplay = document.getElementById('centerDisplay');
    if (centerDisplay) {
        const rect = centerDisplay.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        setTimeout(() => {
            createTreasures(centerX, centerY);
        }, 500);
    }
    
    switch (prizeName) {
        case '大满贯':
            executeBigWin();
            createBigWinEffect();
            break;
        case '双响炮':
            executeDoubleCannon();
            createDoubleCannonEffect();
            break;
        case '彩金':
            executeColorGold();
            createColorGoldEffect();
            break;
        case '大四喜':
            executeFourJoys();
            createFourJoysEffect();
            break;
        case '通通有奖':
            executeAllPrizes();
            createAllPrizesEffect();
            break;
        case '小三元':
            executeSmallThree();
            createSmallThreeEffect();
            break;
        case '大三元':
            executeBigThree();
            createBigThreeEffect();
            break;
        case '开火车':
            executeTrain();
            createTrainEffect();
            break;
    }
}

function executeBigWin() {
    isRunning = true;
    startButton.disabled = true;
    
    // 清理所有可能正在运行的动画
    if (window.currentAnimationInterval) {
        clearInterval(window.currentAnimationInterval);
        window.currentAnimationInterval = null;
    }
    if (window.currentAnimationTimeout) {
        clearTimeout(window.currentAnimationTimeout);
        window.currentAnimationTimeout = null;
    }
    
    const glowClasses = ['glow-red', 'glow-green', 'glow-blue', 'glow-yellow', 'glow-magenta', 'glow-cyan', 'glow-orange'];
    
    // 清除所有现有的发光效果
    buttons.forEach(btn => {
        btn.classList.remove(...glowClasses);
    });
    
    // 第一阶段：5秒多彩闪烁效果
    let flashCount = 0;
    const flashInterval = setInterval(() => {
        // 为所有按钮添加随机颜色的发光效果（包括皇冠）
        buttons.forEach((btn, index) => {
            // 清除之前的发光效果
            btn.classList.remove(...glowClasses);
            // 添加随机颜色的发光效果
            const randomGlowClass = glowClasses[Math.floor(Math.random() * glowClasses.length)];
            btn.classList.add(randomGlowClass);
        });
        
        flashCount++;
        // 5秒后停止闪烁（100ms间隔，共50次）
        if (flashCount >= 50) {
            clearInterval(flashInterval);
            
            // 清除所有发光效果
            buttons.forEach(btn => {
                btn.classList.remove(...glowClasses);
            });
            
            // 开始第二阶段：逐一结算
            setTimeout(() => {
                executeBigWinSettlement();
            }, 500);
        }
    }, 100);
}

// 大满贯逐一结算函数（带亮灯效果）
function executeBigWinSettlement() {
    const positions = [];
    const glowClasses = ['glow-red', 'glow-green', 'glow-blue', 'glow-yellow', 'glow-magenta', 'glow-cyan', 'glow-orange'];
    
    // 收集所有非皇冠位置（0-23，跳过9和21）
    for (let i = 0; i < 24; i++) {
        if (i !== 9 && i !== 21) { // 跳过皇冠位置
            positions.push(i);
        }
    }
    
    let totalWin = 0;
    
    // 逐个结算，每个灯2秒
    positions.forEach((pos, index) => {
        setTimeout(() => {
            const result = calculatePositionWinWithMultiplier(pos);
            const { win, multiplier, item } = result;
            const buttonIndex = getButtonIndexByPosition(pos);
            
            // 更新总奖励
            if (win > 0) {
                const currentWinValue = parseInt(getWin().replace(/,/g, ''));
                setWin(currentWinValue + win);
                totalWin += win;
            }
            
            // 先给按钮添加发光效果
            const randomGlowClass = glowClasses[Math.floor(Math.random() * glowClasses.length)];
            buttons[buttonIndex].classList.add(randomGlowClass);
            
            // 按钮缩放动画（最大1.1倍）
            animateButtonScale(buttons[buttonIndex], 2000);
            
            // 积分池显示当前倍率
            updatePoolDisplay(multiplier);
            
            // 结算完成后熄灭该灯（延迟1.5秒后熄灭）
            setTimeout(() => {
                buttons[buttonIndex].classList.remove(randomGlowClass);
            }, 1500);
            
            // 最后一个灯结算完成后
            if (index === positions.length - 1) {
                setTimeout(() => {
                    // 大满贯2次成就
                    koiFragments.achievements.bigWinTwice++;
                    if (koiFragments.achievements.bigWinTwice >= 2 && !koiFragments.fragments[2]) {
                        checkAndAwardKoiFragment(2);
                    }
                    
                    // 重置状态
                    isRunning = false;
                    isGuessingPhase = false;
                    isWaitingForStart = true;
                    startButton.disabled = false;
                }, 2000);
            }
        }, index * 2000); // 每个灯间隔2秒
    });
}

function executeDoubleCannon() {
    isRunning = true;
    startButton.disabled = true;
    window.isDoubleCannonMode = true; // 设置双响炮模式标志
    
    // 清理所有可能正在运行的动画
    if (window.currentAnimationInterval) {
        clearInterval(window.currentAnimationInterval);
        window.currentAnimationInterval = null;
    }
    if (window.currentAnimationTimeout) {
        clearTimeout(window.currentAnimationTimeout);
        window.currentAnimationTimeout = null;
    }
    
    const glowClasses = ['glow-red', 'glow-blue'];
    
    // 彻底清除所有glow效果
    buttons.forEach(btn => {
        btn.classList.remove('glow-red', 'glow-blue', 'glow-100', 'glow-60', 'glow-30', 'glow-green', 'glow-yellow', 'glow-magenta', 'glow-cyan', 'glow-orange');
    });
    
    const excludedPositions = [2, 3, 9, 14, 15, 21];
    
    function getValidFinalPosition() {
        let pos1;
        do {
            pos1 = Math.floor(Math.random() * 24);
        } while (excludedPositions.includes(pos1));
        return pos1;
    }
    
    const finalPos1 = getValidFinalPosition();
    const finalPos2 = (finalPos1 + 12) % 24;
    
    // 随机选择起始位置
    const cwStartPos = Math.floor(Math.random() * 24);
    const ccwStartPos = Math.floor(Math.random() * 24);
    
    // 计算从起点到终点的步数（确保跑至少1圈）
    const cwSteps = (finalPos1 - cwStartPos + 24) % 24 + 24; // 至少1圈
    const ccwSteps = (ccwStartPos - finalPos2 + 24) % 24 + 24; // 至少1圈
    
    let cwCurrentStep = 0;
    let ccwCurrentStep = 0;
    let bothFinished = false;
    
    // 异步控制两个灯的动画
    function animateClockwiseLight() {
        // 清除之前的红光
        buttons.forEach(btn => btn.classList.remove('glow-red'));
        
        // 计算当前位置（基于已经完成的步数）
        const cwCurrentLogicalPos = (cwStartPos + cwCurrentStep) % 24;
        const cwCurrentButtonIndex = getButtonIndexByPosition(cwCurrentLogicalPos);
        
        // 显示当前位置
        if (!bothFinished) {
            buttons[cwCurrentButtonIndex].classList.add('glow-red');
        }
        
        if (cwCurrentStep < cwSteps) {
            cwCurrentStep++;
            
            let delay = 100;
            if (cwCurrentStep > cwSteps - 11) { // 最后11步开始减速（修正边界条件）
                delay = 100 + (cwCurrentStep - (cwSteps - 11)) * 25;
            }
            
            setTimeout(animateClockwiseLight, delay);
        } else {
            // 顺时针灯到达终点 - 确保显示正确的最终位置
            const finalCwButtonIndex = getButtonIndexByPosition(finalPos1);
            buttons.forEach(btn => btn.classList.remove('glow-red'));
            buttons[finalCwButtonIndex].classList.add('glow-red');
            checkBothLightsFinished();
        }
    }
    
    function animateCounterclockwiseLight() {
        // 清除之前的蓝光
        buttons.forEach(btn => btn.classList.remove('glow-blue'));
        
        // 计算当前位置（基于已经完成的步数）
        const ccwCurrentLogicalPos = ((ccwStartPos - ccwCurrentStep) % 24 + 24) % 24;
        const ccwCurrentButtonIndex = getButtonIndexByPosition(ccwCurrentLogicalPos);
        
        // 显示当前位置
        if (!bothFinished) {
            buttons[ccwCurrentButtonIndex].classList.add('glow-blue');
        }
        
        if (ccwCurrentStep < ccwSteps) {
            ccwCurrentStep++;
            
            let delay = 100;
            if (ccwCurrentStep > ccwSteps - 11) { // 最后11步开始减速（修正边界条件）
                delay = 100 + (ccwCurrentStep - (ccwSteps - 11)) * 25;
            }
            
            setTimeout(animateCounterclockwiseLight, delay);
        } else {
            // 逆时针灯到达终点 - 确保显示正确的最终位置
            const finalCcwButtonIndex = getButtonIndexByPosition(finalPos2);
            buttons.forEach(btn => btn.classList.remove('glow-blue'));
            buttons[finalCcwButtonIndex].classList.add('glow-blue');
            checkBothLightsFinished();
        }
    }
    
    function checkBothLightsFinished() {
        if (cwCurrentStep >= cwSteps && ccwCurrentStep >= ccwSteps && !bothFinished) {
            bothFinished = true;
            
            // 两个灯都到达终点，显示最终结果
            setTimeout(() => {
                // 清除所有效果
                buttons.forEach(btn => {
                    btn.classList.remove('glow-red', 'glow-blue', 'glow-100', 'glow-60', 'glow-30', 'glow-green', 'glow-yellow', 'glow-magenta', 'glow-cyan', 'glow-orange');
                });
                
                // 显示最终位置
                const finalButtonIndex1 = getButtonIndexByPosition(finalPos1);
                const finalButtonIndex2 = getButtonIndexByPosition(finalPos2);
                
                buttons[finalButtonIndex1].classList.add('glow-red');
                buttons[finalButtonIndex2].classList.add('glow-blue');
                
                calculateDoubleCannonWin(finalPos1, finalPos2);
            }, 300); // 稍微延迟，避免闪现感
        }
    }
    
    // 启动两个独立的动画
    animateClockwiseLight();
    animateCounterclockwiseLight();
}

/**
 * 统一清理所有游戏效果
 * 在游戏结束后调用，确保下一轮游戏开始前界面干净
 */
function clearAllEffects() {
    // 1. 清理按钮发光效果
    const glowClasses = [
        'glow-red', 'glow-blue', 'glow-green', 'glow-yellow', 
        'glow-magenta', 'glow-cyan', 'glow-orange',
        'glow-100', 'glow-60', 'glow-30'
    ];
    
    buttons.forEach(btn => {
        glowClasses.forEach(className => {
            btn.classList.remove(className);
        });
    });
    
    // 2. 清理内圈浮动项发光效果
    const floatingItems = document.querySelectorAll('.floating-item');
    floatingItems.forEach(item => {
        item.style.boxShadow = 'none';
    });
    
    // 3. 清理特效元素（彩带、烟花、荧光字等）
    const effectSelectors = [
        '.confetti-container',
        '.firework-particle', 
        '.neon-text-container',
        '.fireworks-container'
    ];
    
    effectSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (element && element.parentNode) {
                element.remove();
            }
        });
    });
    
    // 4. 清理定时器和动画
    if (window.currentAnimationInterval) {
        clearInterval(window.currentAnimationInterval);
        window.currentAnimationInterval = null;
    }
    
    if (window.currentAnimationTimeout) {
        clearTimeout(window.currentAnimationTimeout);
        window.currentAnimationTimeout = null;
    }
    
    // 5. 清理双响炮相关的定时器
    if (window.doubleCannonTimeout1) {
        clearTimeout(window.doubleCannonTimeout1);
        window.doubleCannonTimeout1 = null;
    }
    
    if (window.doubleCannonTimeout2) {
        clearTimeout(window.doubleCannonTimeout2);
        window.doubleCannonTimeout2 = null;
    }
    
    // 6. 清理内圈动画定时器
    if (window.innerCircleInterval) {
        clearInterval(window.innerCircleInterval);
        window.innerCircleInterval = null;
    }
    
    // 7. 清理其他游戏模式的定时器
    if (window.fourJoysInterval) {
        clearInterval(window.fourJoysInterval);
        window.fourJoysInterval = null;
    }
    
    if (window.trainInterval) {
        clearInterval(window.trainInterval);
        window.trainInterval = null;
    }
    
    // 8. 清理状态标志
    window.isDoubleCannonMode = false;
    isInnerCircleRunning = false;
}

function calculateDoubleCannonWin(pos1, pos2) {
    // 使用增强版多灯结算函数处理双响炮
    enhancedMultiLightSettlement([pos1, pos2], '双响炮');
    
    koiFragments.achievements.doubleCannonTwice++;
    if (koiFragments.achievements.doubleCannonTwice >= 2 && !koiFragments.fragments[3]) {
        checkAndAwardKoiFragment(3);
    }
}

function executeTrain() {
    isRunning = true;
    
    // 清理所有可能正在运行的动画
    if (window.currentAnimationInterval) {
        clearInterval(window.currentAnimationInterval);
        window.currentAnimationInterval = null;
    }
    if (window.currentAnimationTimeout) {
        clearTimeout(window.currentAnimationTimeout);
        window.currentAnimationTimeout = null;
    }
    
    // 彻底清除所有glow效果
    buttons.forEach(btn => {
        btn.classList.remove('glow-red', 'glow-blue', 'glow-100', 'glow-60', 'glow-30', 'glow-green', 'glow-yellow', 'glow-magenta', 'glow-cyan', 'glow-orange');
    });
    // 概率分布：2个灯概率最大，7个灯概率最小
    function getTrainLength() {
        const rand = Math.random();
        if (rand < 0.3) return 2;      // 30% 概率
        if (rand < 0.5) return 3;      // 20% 概率
        if (rand < 0.65) return 4;     // 15% 概率
        if (rand < 0.77) return 5;     // 12% 概率
        if (rand < 0.87) return 6;     // 10% 概率
        return 7;                       // 13% 概率
    }
    
    const trainLength = getTrainLength();
    const glowClasses = ['glow-red', 'glow-green', 'glow-blue', 'glow-yellow', 'glow-magenta', 'glow-cyan', 'glow-orange'];
    
    // 随机圈数：1-2圈
    const circles = Math.random() < 0.6 ? 1 : 2;  // 60%概率1圈，40%概率2圈
    const totalSteps = circles * 24 + Math.floor(Math.random() * 12); // 1-2圈 + 0-11步额外
    
    // 所有灯数都不能停在皇冠位置(9和21)
    function getValidStartPosition(length) {
        let validStart = -1;
        let attempts = 0;
        
        while (validStart === -1 && attempts < 100) {
            const start = Math.floor(Math.random() * 24);
            let hasCrown = false;
            
            // 检查所有连续位置是否包含皇冠
            for (let i = 0; i < length; i++) {
                const pos = (start + i) % 24;
                if (pos === 9 || pos === 21) { // 皇冠位置
                    hasCrown = true;
                    break;
                }
            }
            
            if (!hasCrown) {
                validStart = start;
            }
            attempts++;
        }
        
        return validStart >= 0 ? validStart : 0; // 如果找不到有效位置，默认从0开始
    }
    
    const startPosition = getValidStartPosition(trainLength);
    let positions = [];
    let currentLength = 0;  // 当前火车长度（逐个出现）
    let steps = 0;
    
    // 验证最终停止位置是否包含皇冠
    function isValidFinalPosition(startPos, steps, length) {
        // 计算最终第一个灯的位置
        const finalFirstPos = (startPos + steps) % 24;
        
        // 检查所有连续位置是否包含皇冠
        for (let i = 0; i < length; i++) {
            const pos = (finalFirstPos + i) % 24;
            if (pos === 9 || pos === 21) { // 皇冠位置
                return false;
            }
        }
        return true;
    }
    
    // 调整总步数，确保最终位置不包含皇冠
    let adjustedTotalSteps = totalSteps;
    let attempts = 0;
    while (!isValidFinalPosition(startPosition, adjustedTotalSteps, trainLength) && attempts < 50) {
        // 尝试增加或减少步数，找到有效位置
        adjustedTotalSteps = totalSteps + Math.floor(Math.random() * 24);
        attempts++;
    }
    
    const finalTotalSteps = adjustedTotalSteps;
    
    // 火车移动动画：逐个出现，然后整体移动
    window.currentAnimationInterval = setInterval(() => {
        buttons.forEach(btn => {
            btn.classList.remove(...glowClasses);
        });
        
        // 阶段1：火车逐个出现
        if (currentLength < trainLength) {
            currentLength++;
            positions = [];
            for (let i = 0; i < currentLength; i++) {
                positions.push((startPosition + steps - i + 24) % 24);
            }
        } else {
            // 阶段2：整体移动
            positions = positions.map(pos => (pos + 1) % 24);
        }
        
        // 显示当前火车位置
        positions.forEach((pos, index) => {
            const buttonIndex = getButtonIndexByPosition(pos);
            buttons[buttonIndex].classList.add(glowClasses[index % glowClasses.length]);
        });
        
        steps++;
        
        if (steps >= finalTotalSteps) {
            clearInterval(window.currentAnimationInterval);
            window.currentAnimationInterval = null;
            
            const firstPos = positions[0];
            const finalPositions = [];
            for (let i = 0; i < trainLength; i++) {
                finalPositions.push((firstPos + i) % 24);
            }
            
            buttons.forEach(btn => {
                btn.classList.remove(...glowClasses);
            });
            finalPositions.forEach((pos, index) => {
                const buttonIndex = getButtonIndexByPosition(pos);
                buttons[buttonIndex].classList.add(glowClasses[index % glowClasses.length]);
            });
            
            setTimeout(() => {
                enhancedMultiLightSettlement(finalPositions, '开火车');
            }, 500);
        }
    }, 100);
}



function executeBigThree() {
    isRunning = true;
    
    const bigFruitPositions = [];
    
    itemMultipliers.forEach((item, index) => {
        if (!item.isSmall && !item.name.includes('皇冠')) {
            bigFruitPositions.push(index);
        }
    });
    
    // 从符合条件的水果中随机选择3个不同位置
    const shuffledPositions = [...bigFruitPositions].sort(() => Math.random() - 0.5);
    const finalPositions = shuffledPositions.slice(0, 3);
    
    const glowClasses = ['glow-red', 'glow-green', 'glow-blue'];
    
    // 创建3个跑马灯，从随机点开始分别走向3个大水果
    const animations = [];
    
    finalPositions.forEach((targetPos, index) => {
        const animation = {
            index: index,
            targetPos: targetPos,
            currentPos: Math.floor(Math.random() * 24), // 随机起始位置
            glowClass: glowClasses[index],
            speed: 100, // 基础速度 100ms
            steps: 0,
            maxSteps: 24 + Math.floor(Math.random() * 12) // 跑1-1.5圈
        };
        animations.push(animation);
    });
    
    // 开始动画
    let completedAnimations = 0;
    
    // 开始动画（添加减速效果）
    animations.forEach(animation => {
        function animateStep() {
            // 清除当前位置的发光效果
            const currentButtonIndex = getButtonIndexByPosition(animation.currentPos);
            buttons[currentButtonIndex].classList.remove(animation.glowClass);
            
            // 移动到下一个位置
            animation.currentPos = (animation.currentPos + 1) % 24;
            animation.steps++;
            
            // 添加新的发光效果
            const nextButtonIndex = getButtonIndexByPosition(animation.currentPos);
            buttons[nextButtonIndex].classList.add(animation.glowClass);
            
            // 检查是否到达目标位置且跑完指定圈数
            if (animation.currentPos === animation.targetPos && animation.steps >= animation.maxSteps) {
                completedAnimations++;
                
                // 确保最终位置正确显示
                const finalButtonIndex = getButtonIndexByPosition(animation.targetPos);
                buttons.forEach(btn => btn.classList.remove(animation.glowClass));
                buttons[finalButtonIndex].classList.add(animation.glowClass);
                
                // 所有动画完成后进行结算
                if (completedAnimations === animations.length) {
                    setTimeout(() => {
                        showBigThreeResult(finalPositions);
                    }, 1000);
                }
            } else {
                // 计算下一步的延迟（最后几步开始减速）
                let delay = 100; // 基础速度
                const remainingSteps = animation.maxSteps - animation.steps;
                if (remainingSteps <= 11 && remainingSteps > 0) { // 最后11步开始减速
                    delay = 100 + (11 - remainingSteps) * 25;
                }
                
                setTimeout(animateStep, delay);
            }
        }
        
        // 开始动画
        animateStep();
    });
}

function showBigThreeResult(finalPositions) {
    // 计算总奖励和第一个水果的倍率用于积分池显示
    const numberDivs = threeRowGrid.querySelectorAll('.row-number');
    let totalWin = 0;
    let firstMultiplier = 0;
    
    // 定义thirdRowMultipliers映射
    const thirdRowMultipliers = {
        'bar': 100,
        '金条': 40,
        '双星': 30,
        '西瓜': 20,
        '铃铛': 20,
        '芒果': 15,
        '橙子': 10,
        '苹果': 5
    };
    
    finalPositions.forEach((pos, index) => {
        const item = itemMultipliers[pos];
        const betIndex = Object.keys(thirdRowMultipliers).indexOf(item.type);
        
        if (betIndex >= 0) {
            const bet = parseInt(numberDivs[betIndex].textContent);
            if (bet > 0) {
                const multiplier = getMultiplierForItem(item.type);
                const win = multiplier * bet;
                totalWin += win;
                
                if (firstMultiplier === 0) {
                    firstMultiplier = multiplier;
                }
            }
        }
    });
    
    // 使用积分池显示第一个水果的倍率
    if (firstMultiplier > 0) {
        updatePoolDisplay(firstMultiplier);
    }
    
    // 使用增强版多灯结算函数
    enhancedMultiLightSettlement(finalPositions, '大三元');
}



function executeSmallThree() {
    isRunning = true;
    
    const smallFruitPositions = [];
    
    itemMultipliers.forEach((item, index) => {
        if (item.isSmall) {
            smallFruitPositions.push(index);
        }
    });
    
    // 从符合条件的小水果中随机选择3个不同位置
    const shuffledPositions = [...smallFruitPositions].sort(() => Math.random() - 0.5);
    const finalPositions = shuffledPositions.slice(0, 3);
    
    const glowClasses = ['glow-red', 'glow-green', 'glow-blue'];
    
    // 创建3个跑马灯，从随机点开始分别走向3个小水果
    const animations = [];
    
    finalPositions.forEach((targetPos, index) => {
        const animation = {
            index: index,
            targetPos: targetPos,
            currentPos: Math.floor(Math.random() * 24), // 随机起始位置
            glowClass: glowClasses[index],
            speed: 100, // 基础速度 100ms
            steps: 0,
            maxSteps: 24 + Math.floor(Math.random() * 12) // 跑1-1.5圈
        };
        animations.push(animation);
    });
    
    // 开始动画
    let completedAnimations = 0;
    
    // 开始动画（添加减速效果）
    animations.forEach(animation => {
        function animateStep() {
            // 清除当前位置的发光效果
            const currentButtonIndex = getButtonIndexByPosition(animation.currentPos);
            buttons[currentButtonIndex].classList.remove(animation.glowClass);
            
            // 移动到下一个位置
            animation.currentPos = (animation.currentPos + 1) % 24;
            animation.steps++;
            
            // 添加新的发光效果
            const nextButtonIndex = getButtonIndexByPosition(animation.currentPos);
            buttons[nextButtonIndex].classList.add(animation.glowClass);
            
            // 检查是否到达目标位置且跑完指定圈数
            if (animation.currentPos === animation.targetPos && animation.steps >= animation.maxSteps) {
                completedAnimations++;
                
                // 确保最终位置正确显示
                const finalButtonIndex = getButtonIndexByPosition(animation.targetPos);
                buttons.forEach(btn => btn.classList.remove(animation.glowClass));
                buttons[finalButtonIndex].classList.add(animation.glowClass);
                
                // 所有动画完成后进行结算
                if (completedAnimations === animations.length) {
                    setTimeout(() => {
                        showSmallThreeResult(finalPositions);
                    }, 1000);
                }
            } else {
                // 计算下一步的延迟（最后几步开始减速）
                let delay = 100; // 基础速度
                const remainingSteps = animation.maxSteps - animation.steps;
                if (remainingSteps <= 11 && remainingSteps > 0) { // 最后11步开始减速
                    delay = 100 + (11 - remainingSteps) * 25;
                }
                
                setTimeout(animateStep, delay);
            }
        }
        
        // 开始动画
        animateStep();
    });
}

function showSmallThreeResult(finalPositions) {
    // 计算总奖励，小水果固定3倍倍率
    const numberDivs = threeRowGrid.querySelectorAll('.row-number');
    let totalWin = 0;
    
    // 定义thirdRowMultipliers映射
    const thirdRowMultipliers = {
        'bar': 100,
        '金条': 40,
        '双星': 30,
        '西瓜': 20,
        '铃铛': 20,
        '芒果': 15,
        '橙子': 10,
        '苹果': 5
    };
    
    finalPositions.forEach((pos, index) => {
        const item = itemMultipliers[pos];
        const betIndex = Object.keys(thirdRowMultipliers).indexOf(item.type);
        
        if (betIndex >= 0) {
            const bet = parseInt(numberDivs[betIndex].textContent);
            if (bet > 0) {
                const multiplier = 3; // 小水果固定3倍
                const win = multiplier * bet;
                totalWin += win;
            }
        }
    });
    
    // 使用积分池显示固定倍率3
    updatePoolDisplay(3);
    
    // 逐一结算每个小水果
    calculateSmallThreeWin(finalPositions);
}

function calculateSmallThreeWin(finalPositions) {
    const numberDivs = threeRowGrid.querySelectorAll('.row-number');
    let totalWin = 0;
    
    // 定义thirdRowMultipliers映射
    const thirdRowMultipliers = {
        'bar': 100,
        '金条': 40,
        '双星': 30,
        '西瓜': 20,
        '铃铛': 20,
        '芒果': 15,
        '橙子': 10,
        '苹果': 5
    };
    
    // 逐一结算每个小水果
    finalPositions.forEach((pos, index) => {
        setTimeout(() => {
            const item = itemMultipliers[pos];
            const betIndex = Object.keys(thirdRowMultipliers).indexOf(item.type);
            
            if (betIndex >= 0) {
                const bet = parseInt(numberDivs[betIndex].textContent);
                if (bet > 0) {
                    let multiplier;
                    if (item.name.includes('bar')) {
                        multiplier = item.multiplier || 30;
                    } else if (item.isSmall) {
                        multiplier = 3;
                    } else {
                        multiplier = getMultiplierForItem(item.type);
                    }
                    const win = multiplier * bet;
                    totalWin += win;
                    
                    // 更新显示
                    const currentWin = parseInt(getWin().replace(/,/g, ''));
                    setWin(currentWin + win);
                }
            }
            
            // 最后一个水果结算完成后
            if (index === finalPositions.length - 1) {
                isRunning = false;
                isGuessingPhase = false;
                isWaitingForStart = true;
                startButton.disabled = false;
            }
        }, index * 1000); // 每个小水果间隔1秒结算
    });
}

function executeAllPrizes() {
    isRunning = true;
    
    const numberDivs = threeRowGrid.querySelectorAll('.row-number');
    
    // 保存初始下注值
    const originalBets = [];
    for (let i = 0; i < 8; i++) {
        originalBets.push(numberDivs[i].textContent);
    }
    
    let index = 7; // 从右到左开始
    let currentBetIndex = -1;
    let currentBet = 0;
    
    const steps = 10;
    const stepDuration = 100;
    
    const transferInterval = setInterval(() => {
        if (currentBetIndex === -1) {
            // 开始处理下一个下注位置
            if (index >= 0) {
                currentBet = parseInt(numberDivs[index].textContent);
                currentBetIndex = 0;
                
                // 如果当前下注为0，直接处理下一个位置
                if (currentBet === 0) {
                    index--;
                    currentBetIndex = -1;
                }
            } else {
                // 所有位置处理完成
                clearInterval(transferInterval);
                
                // 恢复初始下注值
                for (let i = 0; i < 8; i++) {
                    numberDivs[i].textContent = originalBets[i];
                }
                
                isRunning = false;
                isGuessingPhase = false;
                isWaitingForStart = true;
                startButton.disabled = false;
            }
        } else {
            // 处理当前下注位置的动画
            if (currentBetIndex < steps) {
                currentBetIndex++;
                const decreaseAmount = Math.ceil(currentBet / steps);
                const currentDisplayBet = parseInt(numberDivs[index].textContent);
                
                // 计算新的下注值和win值
                const newBet = Math.max(0, currentDisplayBet - decreaseAmount);
                const winIncrease = Math.min(decreaseAmount, currentDisplayBet);
                
                // 更新显示
                numberDivs[index].textContent = newBet;
                setWin(parseInt(getWin().replace(/,/g, '')) + winIncrease);
            } else {
                // 当前下注位置处理完成
                index--;
                currentBetIndex = -1;
            }
        }
    }, stepDuration);
}

function executeColorGold() {
    isRunning = true;
    
    const poolValue = poolCurrentDisplay;
    const currentWin = parseInt(getWin().replace(/,/g, ''));
    
    const jinliLabel = document.getElementById('jinliLabel');
    showGameplayEffect('彩金', 3000, jinliLabel);
    
    animateColorGoldDecrement(poolValue, currentWin, 10000);
    
    setTimeout(() => {
        isRunning = false;
        isGuessingPhase = false;
        isWaitingForStart = true;
        startButton.disabled = false;
    }, 10000);
}

function executeFourJoys() {
    isRunning = true;
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // 苹果固定倍率是5或6倍
    const appleMultiplier = Math.random() < 0.5 ? 5 : 6;
    updatePoolDisplay(appleMultiplier);
    
    const finalPositions = [5, 10, 16, 22]; // 四个苹果位置（索引5,10,16,22）
    const glowClasses = ['glow-red', 'glow-green', 'glow-blue', 'glow-yellow'];
    
    // 创建中心点出发的跑马灯效果
    createCenterToApplesAnimation(buttons, finalPositions, glowClasses, appleMultiplier);
}

// 生成随机倍数（2-10倍，4-8倍概率更高）
function generateRandomMultiplier() {
    const ranges = [
        { min: 2, max: 3, weight: 10 },   // 低概率 10%
        { min: 4, max: 8, weight: 70 },  // 高概率 70%
        { min: 9, max: 10, weight: 20 }  // 中等概率 20%
    ];
    
    const totalWeight = ranges.reduce((sum, range) => sum + range.weight, 0);
    let randomWeight = Math.random() * totalWeight;
    
    for (let range of ranges) {
        if (randomWeight < range.weight) {
            const result = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
            return result;
        }
        randomWeight -= range.weight;
    }
    
    return 6; // 默认返回6倍
}

// 创建从中心点到四个苹果的跑马灯动画
function createCenterToApplesAnimation(buttons, finalPositions, glowClasses, multiplier) {
    // 清除所有按钮的发光效果
    buttons.forEach(btn => {
        btn.classList.remove(...glowClasses);
    });
    
    // 创建四个跑马灯，从中心点分别走向四个苹果
    const animations = [];
    
    finalPositions.forEach((targetPos, index) => {
        const animation = {
            index: index,
            targetPos: targetPos,
            currentPos: 0, // 从位置0开始
            glowClass: glowClasses[index],
            speed: 100, // 与双响炮一致的基础速度 100ms
            steps: 0,
            maxSteps: 24 + Math.floor(Math.random() * 12) // 跑1-1.5圈
        };
        animations.push(animation);
    });
    
    // 开始动画
    let completedAnimations = 0;
    
    // 开始动画（添加减速效果，与双响炮一致）
    animations.forEach(animation => {
        function animateStep() {
            // 清除当前位置的发光效果
            const currentButtonIndex = getButtonIndexByPosition(animation.currentPos);
            buttons[currentButtonIndex].classList.remove(animation.glowClass);
            
            // 移动到下一个位置
            animation.currentPos = (animation.currentPos + 1) % 24;
            animation.steps++;
            
            // 添加新的发光效果
            const nextButtonIndex = getButtonIndexByPosition(animation.currentPos);
            buttons[nextButtonIndex].classList.add(animation.glowClass);
            
            // 检查是否到达目标位置且跑完指定圈数
            if (animation.currentPos === animation.targetPos && animation.steps >= animation.maxSteps) {
                completedAnimations++;
                
                // 确保最终位置正确显示
                const finalButtonIndex = getButtonIndexByPosition(animation.targetPos);
                buttons.forEach(btn => btn.classList.remove(animation.glowClass));
                buttons[finalButtonIndex].classList.add(animation.glowClass);
                
                // 所有动画完成后进行结算
                if (completedAnimations === animations.length) {
                    setTimeout(() => {
                        showFourJoysResult(multiplier);
                    }, 1000);
                }
            } else {
                // 计算下一步的延迟（最后几步开始减速）
                let delay = 100; // 基础速度，与双响炮一致
                const remainingSteps = animation.maxSteps - animation.steps;
                if (remainingSteps <= 11 && remainingSteps > 0) { // 最后11步开始减速
                    delay = 100 + (11 - remainingSteps) * 25; // 与双响炮减速逻辑一致
                }
                
                setTimeout(animateStep, delay);
            }
        }
        
        // 开始动画
        animateStep();
    });
}

// 显示大四喜结果（删除描述性文字，统一使用文字特效）
function showFourJoysResult(multiplier) {
    // 计算最终奖励
    calculateFourJoysWin(multiplier);
}

function calculateFourJoysWin(multiplier) {
    const numberDivs = threeRowGrid.querySelectorAll('.row-number');
    
    // 定义thirdRowMultipliers（与其他函数保持一致）
    const thirdRowMultipliers = {
        'bar': 100,
        '金条': 40,
        '双星': 30,
        '西瓜': 20,
        '铃铛': 20,
        '芒果': 15,
        '橙子': 10,
        '苹果': 5
    };
    
    const appleIndex = Object.keys(thirdRowMultipliers).indexOf('苹果');
    
    if (appleIndex >= 0 && appleIndex < numberDivs.length) {
        const appleBet = parseInt(numberDivs[appleIndex].textContent);
        
        const totalWin = 4 * multiplier * appleBet;
    
        const currentWin = parseInt(getWin().replace(/,/g, ''));
        setWin(currentWin + totalWin);
        
        // 检查成就
        if (totalWin >= 10000 && !koiFragments.achievements.singleWinOver10000) {
            koiFragments.achievements.singleWinOver10000 = true;
            checkAndAwardKoiFragment(0);
        }
        
        // 大四喜10次成就
        koiFragments.achievements.fourJoysTenTimes++;
        if (koiFragments.achievements.fourJoysTenTimes >= 10 && !koiFragments.fragments[1]) {
            checkAndAwardKoiFragment(1);
        }
        
    } else {
    }
    
    // 大四喜结算完成
    isRunning = false;
    isGuessingPhase = false;
    isWaitingForStart = true;
    startButton.disabled = false;
}

function createFireworks() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight * 0.5;
            
            for (let j = 0; j < 20; j++) {
                const particle = document.createElement('div');
                particle.className = 'firework-particle';
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                particle.style.left = startX + 'px';
                particle.style.top = startY + 'px';
                document.body.appendChild(particle);
                
                const angle = (Math.PI * 2 / 20) * j;
                const velocity = 2 + Math.random() * 3;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;
                
                let x = startX;
                let y = startY;
                let opacity = 1;
                
                function animateParticle() {
                    x += vx;
                    y += vy;
                    opacity -= 0.02;
                    
                    particle.style.left = x + 'px';
                    particle.style.top = y + 'px';
                    particle.style.opacity = opacity;
                    
                    if (opacity > 0) {
                        requestAnimationFrame(animateParticle);
                    } else {
                        particle.remove();
                    }
                }
                
                requestAnimationFrame(animateParticle);
            }
        }, i * 300);
    }
}

function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-20px';
            confetti.style.width = (5 + Math.random() * 10) + 'px';
            confetti.style.height = (5 + Math.random() * 10) + 'px';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            document.body.appendChild(confetti);
            
            let x = parseFloat(confetti.style.left);
            let y = -20;
            let rotation = parseFloat(confetti.style.transform.replace(/[^0-9.-]/g, ''));
            const speedY = 2 + Math.random() * 3;
            const speedX = (Math.random() - 0.5) * 2;
            const rotationSpeed = (Math.random() - 0.5) * 10;
            
            function animateConfetti() {
                y += speedY;
                x += speedX;
                rotation += rotationSpeed;
                
                confetti.style.left = x + 'px';
                confetti.style.top = y + 'px';
                confetti.style.transform = `rotate(${rotation}deg)`;
                
                if (y < window.innerHeight) {
                    requestAnimationFrame(animateConfetti);
                } else {
                    confetti.remove();
                }
            }
            
            requestAnimationFrame(animateConfetti);
        }, i * 30);
    }
}

function createTreasures(centerX, centerY) {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const treasure = document.createElement('div');
            treasure.className = 'ingot';
            
            treasure.style.left = centerX + 'px';
            treasure.style.top = centerY + 'px';
            document.body.appendChild(treasure);
            
            const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.8;
            const distance = 250 + Math.random() * 200;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            const peakHeight = -(50 + Math.random() * 150);
            
            const duration = 2000;
            const startTime = performance.now();
            
            function animateTreasure(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const currentX = centerX + (endX - centerX) * progress;
                const parabolicY = -4 * peakHeight * progress * (progress - 1);
                const currentY = centerY + (endY - centerY) * progress + parabolicY;
                
                treasure.style.left = currentX + 'px';
                treasure.style.top = currentY + 'px';
                treasure.style.opacity = 1 - progress * 0.5;
                
                if (progress < 1) {
                    requestAnimationFrame(animateTreasure);
                } else {
                    treasure.remove();
                }
            }
            
            requestAnimationFrame(animateTreasure);
        }, i * 100);
    }
}

function createBigWinEffect() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.style.position = 'fixed';
            star.style.width = '4px';
            star.style.height = '4px';
            star.style.backgroundColor = '#ffd700';
            star.style.borderRadius = '50%';
            star.style.boxShadow = '0 0 10px #ffd700, 0 0 20px #ff8c00';
            star.style.left = centerX + 'px';
            star.style.top = centerY + 'px';
            star.style.zIndex = '1000';
            star.style.pointerEvents = 'none';
            document.body.appendChild(star);
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 200 + Math.random() * 300;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            const duration = 1500;
            const startTime = performance.now();
            
            function animateStar() {
                const elapsed = performance.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const currentX = centerX + (endX - centerX) * progress;
                const currentY = centerY + (endY - centerY) * progress;
                const scale = 1 + Math.sin(progress * Math.PI) * 0.5;
                
                star.style.left = currentX + 'px';
                star.style.top = currentY + 'px';
                star.style.transform = `scale(${scale})`;
                star.style.opacity = 1 - progress;
                
                if (progress < 1) {
                    requestAnimationFrame(animateStar);
                } else {
                    star.remove();
                }
            }
            
            requestAnimationFrame(animateStar);
        }, i * 30);
    }
}

function createDoubleCannonEffect() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 2; i++) {
        setTimeout(() => {
            const angle = (i === 0) ? -Math.PI / 4 : Math.PI * 3 / 4;
            const startX = centerX;
            const startY = centerY;
            
            for (let j = 0; j < 30; j++) {
                setTimeout(() => {
                    const particle = document.createElement('div');
                    particle.style.position = 'fixed';
                    particle.style.width = '6px';
                    particle.style.height = '6px';
                    particle.style.backgroundColor = '#ff4444';
                    particle.style.borderRadius = '50%';
                    particle.style.boxShadow = '0 0 10px #ff4444, 0 0 20px #ff0000';
                    particle.style.left = startX + 'px';
                    particle.style.top = startY + 'px';
                    particle.style.zIndex = '1000';
                    particle.style.pointerEvents = 'none';
                    document.body.appendChild(particle);
                    
                    const distance = 150 + j * 10;
                    const endX = startX + Math.cos(angle) * distance;
                    const endY = startY + Math.sin(angle) * distance;
                    
                    const duration = 1000;
                    const startTime = performance.now();
                    
                    function animateParticle() {
                        const elapsed = performance.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        const currentX = startX + (endX - startX) * progress;
                        const currentY = startY + (endY - startY) * progress;
                        
                        particle.style.left = currentX + 'px';
                        particle.style.top = currentY + 'px';
                        particle.style.opacity = 1 - progress;
                        
                        if (progress < 1) {
                            requestAnimationFrame(animateParticle);
                        } else {
                            particle.remove();
                        }
                    }
                    
                    requestAnimationFrame(animateParticle);
                }, j * 20);
            }
        }, i * 500);
    }
}

function createColorGoldEffect() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const angle = (Math.PI * 2 / 8) * i;
            const startX = centerX;
            const startY = centerY;
            
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '20px';
            particle.style.height = '20px';
            particle.style.background = 'linear-gradient(45deg, #ffd700, #ff8c00)';
            particle.style.borderRadius = '50%';
            particle.style.boxShadow = '0 0 20px #ffd700, 0 0 40px #ff8c00';
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            particle.style.zIndex = '1000';
            particle.style.pointerEvents = 'none';
            document.body.appendChild(particle);
            
            const distance = 300;
            const endX = startX + Math.cos(angle) * distance;
            const endY = startY + Math.sin(angle) * distance;
            
            const duration = 2000;
            const startTime = performance.now();
            
            function animateParticle() {
                const elapsed = performance.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const currentX = startX + (endX - startX) * progress;
                const currentY = startY + (endY - startY) * progress;
                const scale = 1 + Math.sin(progress * Math.PI * 4) * 0.3;
                
                particle.style.left = currentX + 'px';
                particle.style.top = currentY + 'px';
                particle.style.transform = `scale(${scale})`;
                particle.style.opacity = 1 - progress;
                
                if (progress < 1) {
                    requestAnimationFrame(animateParticle);
                } else {
                    particle.remove();
                }
            }
            
            requestAnimationFrame(animateParticle);
        }, i * 100);
    }
}

function createFourJoysEffect() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 4; i++) {
        setTimeout(() => {
            const angle = (Math.PI * 2 / 4) * i;
            const startX = centerX;
            const startY = centerY;
            
            const ring = document.createElement('div');
            ring.style.position = 'fixed';
            ring.style.width = '10px';
            ring.style.height = '10px';
            ring.style.border = '3px solid #ff69b4';
            ring.style.borderRadius = '50%';
            ring.style.boxShadow = '0 0 20px #ff69b4, 0 0 40px #4a90e2';
            ring.style.left = startX + 'px';
            ring.style.top = startY + 'px';
            ring.style.zIndex = '1000';
            ring.style.pointerEvents = 'none';
            document.body.appendChild(ring);
            
            const distance = 250;
            const endX = startX + Math.cos(angle) * distance;
            const endY = startY + Math.sin(angle) * distance;
            
            const duration = 1500;
            const startTime = performance.now();
            
            function animateRing() {
                const elapsed = performance.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const currentX = startX + (endX - startX) * progress;
                const currentY = startY + (endY - startY) * progress;
                const scale = 1 + progress * 2;
                
                ring.style.left = currentX + 'px';
                ring.style.top = currentY + 'px';
                ring.style.transform = `scale(${scale})`;
                ring.style.opacity = 1 - progress;
                
                if (progress < 1) {
                    requestAnimationFrame(animateRing);
                } else {
                    ring.remove();
                }
            }
            
            requestAnimationFrame(animateRing);
        }, i * 200);
    }
}

function createAllPrizesEffect() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '8px';
            particle.style.height = '8px';
            particle.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            particle.style.borderRadius = '50%';
            particle.style.boxShadow = '0 0 15px #667eea, 0 0 30px #764ba2';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.zIndex = '1000';
            particle.style.pointerEvents = 'none';
            document.body.appendChild(particle);
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 200 + Math.random() * 200;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            const duration = 1800;
            const startTime = performance.now();
            
            function animateParticle() {
                const elapsed = performance.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const currentX = centerX + (endX - centerX) * progress;
                const currentY = centerY + (endY - centerY) * progress;
                
                particle.style.left = currentX + 'px';
                particle.style.top = currentY + 'px';
                particle.style.opacity = 1 - progress;
                
                if (progress < 1) {
                    requestAnimationFrame(animateParticle);
                } else {
                    particle.remove();
                }
            }
            
            requestAnimationFrame(animateParticle);
        }, i * 50);
    }
}

function createSmallThreeEffect() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const angle = (Math.PI * 2 / 3) * i - Math.PI / 2;
            const startX = centerX;
            const startY = centerY;
            
            const triangle = document.createElement('div');
            triangle.style.position = 'fixed';
            triangle.style.width = '0';
            triangle.style.height = '0';
            triangle.style.borderLeft = '15px solid transparent';
            triangle.style.borderRight = '15px solid transparent';
            triangle.style.borderBottom = '25px solid #00ff00';
            triangle.style.left = startX + 'px';
            triangle.style.top = startY + 'px';
            triangle.style.zIndex = '1000';
            triangle.style.pointerEvents = 'none';
            document.body.appendChild(triangle);
            
            const distance = 200;
            const endX = startX + Math.cos(angle) * distance;
            const endY = startY + Math.sin(angle) * distance;
            
            const duration = 1500;
            const startTime = performance.now();
            
            function animateTriangle() {
                const elapsed = performance.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const currentX = startX + (endX - startX) * progress;
                const currentY = startY + (endY - startY) * progress;
                const rotation = progress * 360;
                
                triangle.style.left = currentX + 'px';
                triangle.style.top = currentY + 'px';
                triangle.style.transform = `rotate(${rotation}deg)`;
                triangle.style.opacity = 1 - progress;
                
                if (progress < 1) {
                    requestAnimationFrame(animateTriangle);
                } else {
                    triangle.remove();
                }
            }
            
            requestAnimationFrame(animateTriangle);
        }, i * 300);
    }
}

function createBigThreeEffect() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const angle = (Math.PI * 2 / 3) * i - Math.PI / 2;
            const startX = centerX;
            const startY = centerY;
            
            const star = document.createElement('div');
            star.style.position = 'fixed';
            star.style.width = '30px';
            star.style.height = '30px';
            star.style.background = 'radial-gradient(circle, #ffff00, #ff8c00)';
            star.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 2% 60%, 59% 23%, 68% 57%, 87% 83%, 82% 75%, 97% 75%, 79% 91%, 50% 70%, 21% 91%, 2% 60%, 59% 23%, 68% 57%, 87% 83%, 82% 75%, 97% 75%, 79% 91%, 50% 70%, 21% 91%, 2% 60%, 59% 23%, 68% 57%, 87% 83%, 82% 75%, 97% 75%, 79% 91%, 50% 70%, 21% 91%, 2% 60%, 59% 23%, 68% 57%, 87% 83%, 82% 75%, 97% 75%)';
            star.style.boxShadow = '0 0 30px #ffff00, 0 0 60px #ff8c00';
            star.style.left = startX + 'px';
            star.style.top = startY + 'px';
            star.style.zIndex = '1000';
            star.style.pointerEvents = 'none';
            document.body.appendChild(star);
            
            const distance = 300;
            const endX = startX + Math.cos(angle) * distance;
            const endY = startY + Math.sin(angle) * distance;
            
            const duration = 2000;
            const startTime = performance.now();
            
            function animateStar() {
                const elapsed = performance.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const currentX = startX + (endX - startX) * progress;
                const currentY = startY + (endY - startY) * progress;
                const scale = 1 + Math.sin(progress * Math.PI) * 0.5;
                const rotation = progress * 720;
                
                star.style.left = currentX + 'px';
                star.style.top = currentY + 'px';
                star.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
                star.style.opacity = 1 - progress;
                
                if (progress < 1) {
                    requestAnimationFrame(animateStar);
                } else {
                    star.remove();
                }
            }
            
            requestAnimationFrame(animateStar);
        }, i * 400);
    }
}

function createTrainEffect() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '15px';
            particle.style.height = '15px';
            particle.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a24)';
            particle.style.borderRadius = '3px';
            particle.style.boxShadow = '0 0 20px #ff6b6b, 0 0 40px #ee5a24';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.zIndex = '1000';
            particle.style.pointerEvents = 'none';
            document.body.appendChild(particle);
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 250 + Math.random() * 150;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            const duration = 2000;
            const startTime = performance.now();
            
            function animateParticle() {
                const elapsed = performance.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const currentX = centerX + (endX - centerX) * progress;
                const currentY = centerY + (endY - centerY) * progress;
                const rotation = progress * 360;
                
                particle.style.left = currentX + 'px';
                particle.style.top = currentY + 'px';
                particle.style.transform = `rotate(${rotation}deg)`;
                particle.style.opacity = 1 - progress;
                
                if (progress < 1) {
                    requestAnimationFrame(animateParticle);
                } else {
                    particle.remove();
                }
            }
            
            requestAnimationFrame(animateParticle);
        }, i * 200);
    }
}

function saveData() {
    const data = {
        credit: getCurrentCredit(),
        win: getWin(),
        bets: Array.from(threeRowGrid.querySelectorAll('.row-number')).map(div => div.textContent)
    };
    localStorage.setItem('tigerGameData', JSON.stringify(data));
    showToast('数据已保存', 'success');
}

function loadData() {
    const savedData = localStorage.getItem('tigerGameData');
    if (savedData) {
        const data = JSON.parse(savedData);
        setCredit(data.credit);
        setWin(data.win);
        
        const numberDivs = threeRowGrid.querySelectorAll('.row-number');
        numberDivs.forEach((div, index) => {
            if (data.bets[index] !== undefined) {
                div.textContent = data.bets[index];
            }
        });
    } else {
        setCredit(0);
        setWin(0);
    }
    
    isWaitingForStart = false;
    isGuessingPhase = false;
    isRunning = false;
    currentWinAmount = 0;
    hasWon = false;
}









function initializeGame() {
    slotGrid = document.getElementById('slotGrid');
    startButton = document.getElementById('startButton');
    bigButton = document.getElementById('bigButton');
    smallButton = document.getElementById('smallButton');
    leftmoveButton = document.getElementById('leftmoveButton');
    rightmoveButton = document.getElementById('rightmoveButton');
    threeRowGrid = document.getElementById('threeRowGrid');

    for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 7; col++) {
            const cell = document.createElement('div');

            if (row === 0 || row === 6 || col === 0 || col === 6) {
                cell.className = 'grid-cell button';
                cell.dataset.row = row;
                cell.dataset.col = col;

                const img = document.createElement('img');
                img.alt = '图标';
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'contain';
                cell.appendChild(img);

                buttons.push(cell);
            }

            slotGrid.appendChild(cell);
        }
    }

    buttons.sort((a, b) => {
        const rowA = parseInt(a.dataset.row);
        const colA = parseInt(a.dataset.col);
        const rowB = parseInt(b.dataset.row);
        const colB = parseInt(b.dataset.col);

        const orderA = getClockwiseOrder(rowA, colA);
        const orderB = getClockwiseOrder(rowB, colB);

        return orderA - orderB;
    });

    buttons.forEach(button => {
        const img = button.querySelector('img');
        img.src = getNextImage();
    });

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 8; col++) {
            if (row === 0) {
                const img = document.createElement('img');
                img.className = 'row-image';
                const imageNames = ['bl100.png', 'bl20.png', 'bl20.png', 'bl20.png', 'bl10.png', 'bl10.png', 'bl10.png', 'bl5.png'];
                img.src = 'img/' + imageNames[col];
                img.alt = '图片占位';
                threeRowGrid.appendChild(img);
            } else if (row === 1) {
                const numberDiv = document.createElement('div');
                numberDiv.className = 'row-number';
                numberDiv.textContent = '0';
                numberDiv.dataset.col = col;
                threeRowGrid.appendChild(numberDiv);
            } else if (row === 2) {
                const buttonDiv = document.createElement('div');
                buttonDiv.className = 'row-button';
                buttonDiv.dataset.col = col;
                const img = document.createElement('img');
                const buttonImageNames = ['bar.png', '金条.png', '双星.png', '西瓜.png', '铃铛.png', '芒果.png', '橙子.png', '苹果.png'];
                img.src = 'img/' + buttonImageNames[col];
                img.alt = '按钮图片';
                buttonDiv.appendChild(img);
                threeRowGrid.appendChild(buttonDiv);

                let holdInterval;
                let isHolding = false;

                buttonDiv.addEventListener('mousedown', (e) => {
                    if (e.button !== 0) return;
                    isHolding = true;
                    incrementNumber(col);
                    holdInterval = setInterval(() => {
                        if (isHolding) {
                            incrementNumber(col);
                        }
                    }, 100);
                });

                buttonDiv.addEventListener('mouseup', () => {
                    isHolding = false;
                    clearInterval(holdInterval);
                });

                buttonDiv.addEventListener('mouseleave', () => {
                    isHolding = false;
                    clearInterval(holdInterval);
                });
            }
        }
    }



    bigButton.addEventListener('click', () => {
        if (isRunning) return;
        
        const currentWin = parseInt(getWin().replace(/,/g, ''));
        
        if (currentWin > 0) {
            playGuessingAnimation('大');
            return;
        }

        const currentCredit = getCurrentCredit();

        const numberDivs = threeRowGrid.querySelectorAll('.row-number');
        let totalIncrease = 0;
        numberDivs.forEach(div => {
            let currentValue = parseInt(div.textContent);
            if (currentValue < 99 && currentCredit - totalIncrease > 0) {
                totalIncrease++;
            }
        });

        if (totalIncrease > 0) {
            numberDivs.forEach(div => {
                let currentValue = parseInt(div.textContent);
                if (currentValue < 99 && currentCredit > 0) {
                    div.textContent = currentValue + 1;
                    const newCredit = getCurrentCredit() - 1;
                    setCredit(newCredit);
                }
            });
        }
    });

    smallButton.addEventListener('click', () => {
        if (isRunning) return;
        
        const currentWin = parseInt(getWin().replace(/,/g, ''));
        
        if (currentWin > 0) {
            playGuessingAnimation('小');
            return;
        }

        const currentCredit = getCurrentCredit();

        const numberDivs = threeRowGrid.querySelectorAll('.row-number');
        numberDivs.forEach(div => {
            let currentValue = parseInt(div.textContent);
            if (currentValue > 0) {
                div.textContent = currentValue - 1;
                const newCredit = getCurrentCredit() + 1;
                setCredit(newCredit);
            }
        });
    });

    let leftmoveInterval;
    let rightmoveInterval;

    leftmoveButton.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        if (isRunning) return;
        
        const currentCredit = getCurrentCredit();
        if (currentCredit > 0) {
            const newCredit = currentCredit - 1;
            setCredit(newCredit);
            const currentWin = parseInt(getWin().replace(/,/g, ''));
            setWin(currentWin + 1);
            
            leftmoveInterval = setInterval(() => {
                const credit = getCurrentCredit();
                if (credit > 0 && !isRunning) {
                    setCredit(credit - 1);
                    const win = parseInt(getWin().replace(/,/g, ''));
                    setWin(win + 1);
                } else {
                    clearInterval(leftmoveInterval);
                }
            }, 100);
        }
    });

    leftmoveButton.addEventListener('mouseup', () => {
        clearInterval(leftmoveInterval);
    });

    leftmoveButton.addEventListener('mouseleave', () => {
        clearInterval(leftmoveInterval);
    });

    rightmoveButton.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        if (isRunning) return;
        
        const currentWin = parseInt(getWin().replace(/,/g, ''));
        if (currentWin > 0) {
            setWin(currentWin - 1);
            const currentCredit = getCurrentCredit();
            setCredit(currentCredit + 1);
            
            rightmoveInterval = setInterval(() => {
                const win = parseInt(getWin().replace(/,/g, ''));
                if (win > 0 && !isRunning) {
                    setWin(win - 1);
                    const credit = getCurrentCredit();
                    setCredit(credit + 1);
                } else {
                    clearInterval(rightmoveInterval);
                }
            }, 100);
        }
    });

    rightmoveButton.addEventListener('mouseup', () => {
        clearInterval(rightmoveInterval);
    });

    rightmoveButton.addEventListener('mouseleave', () => {
        clearInterval(rightmoveInterval);
    });

    document.addEventListener('keydown', (e) => {
        const keyMap = {
            'a': 0,
            's': 1,
            'd': 2,
            'f': 3,
            'j': 4,
            'k': 5,
            'l': 6,
            ';': 7
        };

        if (e.key === 'Enter' || e.key === 'Numpad5' || e.key === '5') {
            startMarquee();
            return;
        }

        if (e.key === '0' || e.key === 'Numpad0') {
            insertCoin();
            return;
        }

        if (e.key === 'Numpad8' || e.key === '8') {
            if (isRunning) return;
            const currentWin = parseInt(getWin().replace(/,/g, ''));
            if (currentWin > 0) {
                playGuessingAnimation('大');
            }
            return;
        }

        if (e.key === 'Numpad2' || e.key === '2') {
            if (isRunning) return;
            const currentWin = parseInt(getWin().replace(/,/g, ''));
            if (currentWin > 0) {
                playGuessingAnimation('小');
            }
            return;
        }

        if (e.key === 'Numpad4' || e.key === '4') {
            if (!isRunning) {
                const currentCredit = getCurrentCredit();
                if (currentCredit > 0) {
                    const newCredit = currentCredit - 1;
                    setCredit(newCredit);
                    const currentWin = parseInt(getWin().replace(/,/g, ''));
                    setWin(currentWin + 1);
                }
            }
            return;
        }

        if (e.key === 'Numpad6' || e.key === '6') {
            if (!isRunning) {
                const currentWin = parseInt(getWin().replace(/,/g, ''));
                if (currentWin > 0) {
                    setWin(currentWin - 1);
                    const currentCredit = getCurrentCredit();
                    setCredit(currentCredit + 1);
                }
            }
            return;
        }

        const col = keyMap[e.key];
        if (col !== undefined) {
            incrementNumber(col);
        }
    });

    startButton.addEventListener('click', startMarquee);

    document.getElementById('saveBtn').addEventListener('click', saveData);
    document.getElementById('resetBtn').addEventListener('click', () => {
        if (confirm('确认重置下注数量吗?')) {
            // setCredit(0);
            // setWin(0);
            const numberDivs = threeRowGrid.querySelectorAll('.row-number');
            numberDivs.forEach(div => {
                div.textContent = '0';
            });
        }
    });
    document.getElementById('backToHome').addEventListener('click', () => {
        if (confirm('确定要返回主页吗？')) {
            window.location.href = 'index.html';
        }
    });



    window.addEventListener('beforeunload', (e) => {
        const data = {
            credit: getCurrentCredit(),
            win: getWin(),
            bets: Array.from(threeRowGrid.querySelectorAll('.row-number')).map(div => div.textContent)
        };
        localStorage.setItem('tigerGameData', JSON.stringify(data));
    });

    // 确保win值和credit值有初始值
    if (!getWin() || getWin() === '0') {
        setWin(0);
    }
    if (!getCurrentCredit() || getCurrentCredit() === '10,000') {
        setCredit(0);
    }
    
    loadData();
    
    // 初始化积分池默认值
    initPoolDisplay();
    
    // 初始化锦鲤碎片系统
    initKoiFragments();
}

// 彩金数字递减动画（纯数字转移，无跑马灯）


// 加权随机函数 - 数值越大概率越低
function weightedRandomPoolValue() {
    // 定义概率区间（权重总和 = 100）
    const ranges = [
        { min: 900, max: 1200, weight: 30, name: "900-1200" },   // 高概率区间 30%
        { min: 1201, max: 1500, weight: 25, name: "1201-1500" },  // 中高概率 25%
        { min: 1501, max: 1800, weight: 20, name: "1501-1800" },  // 中等概率 20%
        { min: 1801, max: 2000, weight: 15, name: "1801-2000" },  // 中低概率 15%
        { min: 2001, max: 3000, weight: 7, name: "2001-3000" },   // 低概率 7%
        { min: 3001, max: 5000, weight: 2, name: "3001-5000" },   // 极低概率 2%
        { min: 5001, max: 9999, weight: 1, name: "5001-9999" }    // 超低概率 1%
    ];
    
    // 计算总权重
    const totalWeight = ranges.reduce((sum, range) => sum + range.weight, 0);
    
    // 生成随机权重值
    let randomWeight = Math.random() * totalWeight;
    
    // 根据权重选择区间
    for (let range of ranges) {
        if (randomWeight < range.weight) {
            // 在选中的区间内生成随机值
            const result = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
            return result;
        }
        randomWeight -= range.weight;
    }
    
    // 默认返回900-1200区间的值
    const defaultResult = Math.floor(Math.random() * 301) + 900;
    return defaultResult;
}

function initializeTestMenu() {
    const testBtn = document.getElementById('testBtn');
    const testMenu = document.getElementById('testMenu');
    const closeTest = document.getElementById('closeTest');
    
    if (testBtn && testMenu && closeTest) {
        testBtn.addEventListener('click', () => {
            testMenu.classList.add('active');
        });
        
        closeTest.addEventListener('click', () => {
            testMenu.classList.remove('active');
        });
    }
}

function testBigWin() {
    const testMenu = document.getElementById('testMenu');
    if (testMenu) testMenu.classList.remove('active');
    executeInnerCirclePrize('大满贯');
}

function testDoubleCannon() {
    const testMenu = document.getElementById('testMenu');
    if (testMenu) testMenu.classList.remove('active');
    executeInnerCirclePrize('双响炮');
}

function testColorGold() {
    const testMenu = document.getElementById('testMenu');
    if (testMenu) testMenu.classList.remove('active');
    executeInnerCirclePrize('彩金');
}

function testFourJoys() {
    const testMenu = document.getElementById('testMenu');
    if (testMenu) testMenu.classList.remove('active');
    executeInnerCirclePrize('大四喜');
}

function testAllPrizes() {
    const testMenu = document.getElementById('testMenu');
    if (testMenu) testMenu.classList.remove('active');
    executeInnerCirclePrize('通通有奖');
}

function testSmallThree() {
    const testMenu = document.getElementById('testMenu');
    if (testMenu) testMenu.classList.remove('active');
    executeInnerCirclePrize('小三元');
}

function testBigThree() {
    const testMenu = document.getElementById('testMenu');
    if (testMenu) testMenu.classList.remove('active');
    executeInnerCirclePrize('大三元');
}

function testTrain() {
    const testMenu = document.getElementById('testMenu');
    if (testMenu) testMenu.classList.remove('active');
    executeInnerCirclePrize('开火车');
}

document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
    initializeTestMenu();
});


