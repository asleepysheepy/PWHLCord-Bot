/**
 * Represents a scheduled job to be executed by cronner
 */
export interface Job {
  /**
   * The name of the job, used as a unique indentifier
   */
  name: string

  /**
   * The schedule to run the job on. Uses cron syntax:
   * https://crontab.guru
   */
  schedule: string

  /**
   * The function to run whenever the job is executed.
   */
  execute: () => Promise<void>
}
