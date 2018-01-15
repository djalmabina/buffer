// Copyright (c) 2018 Alexandre Storelli

import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
//import { load } from './load.js';
import * as moment from 'moment';
import classNames from 'classnames';
//import { getPlayerTime } from './audio.js';

import defaultCover from "./img/default_radio_logo.svg";

class Metadata extends Component {
	constructor(props) {
		super(props);
		this.play = this.play.bind(this);
		this.stop = this.stop.bind(this);
	}


	play(when) {
		this.props.playCallback(this.props.playingRadio, when);
	}

	stop() {
		this.props.playCallback(null, null);
	}

	render() {
		var self = this;
		var previewMode = self.props.maxItems === 1;
		return (
			<MetadataContainer className={classNames({ compact: previewMode })}>
				{this.props.metaList ?
					this.props.metaList.map(function(item, i) {
						if (!item.title || (self.props.maxItems && i >= self.props.maxItems)) return null
						//var playerTime = +self.props.playingDate;
						var playing = +new Date(item.start) - 1000 <= self.props.playingDate && (!item.end || self.props.playingDate < +new Date(item.end) - 1000);
						//console.log("playing=" + playing + " start=" + item.start + " date=" + playerTime + " stop=" + item.end);
						return (
							<MetadataItem className={classNames({ playing: playing, compact: previewMode })} key={"item" + i} onClick={function() { self.play(item.start); }}>
								<MetadataText>
									{!previewMode && (moment(item.start).format("HH:mm") + " – ")}{item.title.artist} - {item.title.title}
								</MetadataText>
								<MetadataCover className={classNames({ playing: playing })} src={item.title.cover || defaultCover} alt="logo" />
							</MetadataItem>
						)
					})
				:
				<span>loading...</span>
				}
			</MetadataContainer>
		)
	}
}

Metadata.propTypes = {
	playingDate: PropTypes.number,
	playingRadio: PropTypes.string.isRequired,
	playCallback: PropTypes.func.isRequired,
	metaList: PropTypes.array,
	maxItems: PropTypes.number
};

const MetadataContainer = styled.div`
	flex-grow: 1;
	overflow-y: scroll;
	&.compact {
		overflow-y: unset;
	}
`;

const MetadataItem = styled.div`
	border: 2px solid #eee;
	border-radius: 10px;
	margin: 10px;
	padding: 10px;
	flex-shrink: 0;
	background: #eee;
	display: flex;
	cursor: pointer;
	
	&.playing {
		border: 2px solid red;
	}

	&.compact {
		margin: 0 0 0 15px;
		border: unset;
	}
`;

const MetadataText = styled.p`
	flex-grow: 1;
	align-self: center;
`

const MetadataCover = styled.img`
	width: 60px;
	height: 60px;
	align-self: center;
	margin-left: 10px;
`;

export default Metadata;

/*&.playing {
	width: 60px;
	height: 60px;
}*/
