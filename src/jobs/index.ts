import type { Job } from '@/models/job'
import { SendBirthdayMessagesJob } from './send-birthday-messages'

export const jobs: Job[] = [SendBirthdayMessagesJob]
