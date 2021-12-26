import React from "react";
import classNames from "classnames";

import VipIcon from "../VipIcon/vipicon";
import Table, {IColumn} from "../Table/table";
import { IMusic, IArtist, IAlbum, MUSIC_STATUS, MUSIC_TYPE } from '../../api/types/business'
import album from "../../api/album";