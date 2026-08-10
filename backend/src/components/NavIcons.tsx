import React from 'react'
import { LayoutGrid, Image as ImageIcon, Tags, Tag, Users, Video, LogOut, FileText, Briefcase } from 'lucide-react'

const iconStyle = { width: '18px', height: '18px' }

export const PostsIcon = () => <LayoutGrid style={iconStyle} />
export const MediaIcon = () => <ImageIcon style={iconStyle} />
export const CategoriesIcon = () => <Tags style={iconStyle} />
export const TagsIcon = () => <Tag style={iconStyle} />
export const TeamIcon = () => <Users style={iconStyle} />
export const ReelsIcon = () => <Video style={iconStyle} />
export const UsersIcon = () => <Users style={iconStyle} />
export const FormsIcon = () => <FileText style={iconStyle} />
export const JobApplicationIcon = () => <Briefcase style={iconStyle} />
