import { Test, TestingModule } from '@nestjs/testing';
import { ChatGetWayGateway } from './chat-get-way.gateway';

describe('ChatGetWayGateway', () => {
  let gateway: ChatGetWayGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatGetWayGateway],
    }).compile();

    gateway = module.get<ChatGetWayGateway>(ChatGetWayGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
