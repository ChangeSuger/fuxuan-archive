import { test, expect } from 'vitest';

import {
  decodeParams,
  decodeNickname,
  decodeColorSpan,
  decodeTextjoin,
  generateDescriptionHTML,
  decodeDescription,
} from '@/utils/decodeText';

test('decodeParams', () => {
  expect(
    decodeParams('获得#1[i]名角色', [{ Value: 50 }])
  ).toBe('获得50名角色');

  expect(
    decodeParams(
      '当队伍中4名角色生命值百分比同时小于等于#1[i]%的情况下获得战斗胜利',
      [{ Value: 0.05000000004656613 }]
    )
  ).toBe('当队伍中4名角色生命值百分比同时小于等于5%的情况下获得战斗胜利');

  expect(
    decodeParams(
      '「金人旧巷市廛喧」中，为金人巷商会赚取#1[i]商会储值金',
      [{ Value: 1000000 }]
    )
  ).toBe('「金人旧巷市廛喧」中，为金人巷商会赚取1,000,000商会储值金')
});

test('decodeNickname', () => {
  expect(
    decodeNickname('使用同时包含银枝、{NICKNAME}的队伍获得1场战斗的胜利', '星')
  ).toBe('使用同时包含银枝、星的队伍获得1场战斗的胜利');
});

test('decodeColorSpan', () => {
  expect(
    decodeColorSpan('<color=#8790abff>※恭喜！你登上了星穹列车！</color>')
  ).toBe('<span style="color: #8790abff">※恭喜！你登上了星穹列车！</span>');
});

test('decodeTextjoin', () => {
  expect(
    decodeTextjoin('在尘埃落定后归还{TEXTJOIN#54}', { 54: '扑神' })
  ).toBe('在尘埃落定后归还扑神');
});

test('generateDescriptionHTML', () => {
  expect(
    generateDescriptionHTML('使用镜流与定分枪互动')
  ).toBe('<p>使用镜流与定分枪互动</p>');
  expect(
    generateDescriptionHTML('停下来听完寒鸦的碎碎念\\n<span style="color: #8790abff">※完整聆听寒鸦的待机动作语音及回合待机语音</span>')
  ).toBe('<p>停下来听完寒鸦的碎碎念</p><p><span style="color: #8790abff">※完整聆听寒鸦的待机动作语音及回合待机语音</span></p>');
});

test('decodeDescription', () => {
  expect(
    decodeDescription({
      achievementDesc: '多事\\n<color=#8790abff>※单场战斗中，使用我方角色刃在单次攻击中从血量小于等于#1[i]%恢复至大于等于30%#2[i]次</color>',
      paramList: [
        {
          Value: 0.05000000004656613
        },
        {
          Value: 2
        }
      ],
    }, {}, '星')
  ).toBe('<p>多事</p><p><span style="color: #8790abff">※单场战斗中，使用我方角色刃在单次攻击中从血量小于等于5%恢复至大于等于30%2次</span></p>');
});
