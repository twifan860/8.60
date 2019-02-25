import React from 'react';
import styled from 'styled-components';

import data from '../../data';
import { MemberMessageGroup, Message } from './MemberMessage';
import WelcomeChannelMessage from './WelcomeChannelMessage';
import ScrollableArea from '../ScrollableArea';

import MemberCardPopup from '../MemberCardPopup';

const StyledMessagesWrapper = styled.div`
  flex: 1 1 auto;
  position: relative;
`;

const createMessageGroup = (groupId, guild, member, time, onMemberClick, messages) => (
  <MemberMessageGroup
    key={groupId}
    guild={guild}
    member={member}
    time={time}
    onMemberClick={onMemberClick}
  >
    {messages}
  </MemberMessageGroup>
);

export default class MessagesWrapper extends React.Component {
  bottomElement = React.createRef();

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.bottomElement.current.scrollIntoView();
  };

  handleMemberClick = (element, member) => {
    const { target } = element;
    const targetRect = target.getBoundingClientRect();
    MemberCardPopup.show({
      direction: 'left',
      position: { x: targetRect.left + targetRect.width + 10, y: targetRect.top },
      member
    });
  };

  render() {
    const { channelName, guild, messages } = this.props;
    let lastUserId = messages.length > 0 ? messages[0].userId : null;
    const groupsComponents = [];
    let messagesComponents = [];
    let headingGroupMessage = null;

    const closeMessageGroupAndClearMessages = () => {
      const userId = headingGroupMessage.userId;
      const guildMembers = guild ? guild.members : [];
      const guildMember = guildMembers.find(m => m.userId === userId);
      const member = {
        ...data.users[headingGroupMessage.userId],
        roles: guildMember ? guildMember.roles : null
      };

      const currentGroupId = headingGroupMessage.id;
      groupsComponents.push(
        createMessageGroup(
          currentGroupId,
          guild,
          member,
          headingGroupMessage.time,
          this.handleMemberClick,
          messagesComponents
        )
      );
      messagesComponents = [];
    };

    messages.forEach((message, index) => {
      const { userId } = message;

      if (userId !== lastUserId && messagesComponents.length > 0) {
        closeMessageGroupAndClearMessages();
      }

      if (messagesComponents.length === 0) {
        headingGroupMessage = message;
      }
      messagesComponents.push(<Message key={message.id}>{message.content}</Message>);
      lastUserId = message.userId;

      if (index + 1 === messages.length) {
        closeMessageGroupAndClearMessages();
      }
    });

    return (
      <StyledMessagesWrapper>
        <ScrollableArea>
          <WelcomeChannelMessage channelName={channelName} />
          {groupsComponents}
          <div ref={this.bottomElement} />
        </ScrollableArea>
      </StyledMessagesWrapper>
    );
  }
}
