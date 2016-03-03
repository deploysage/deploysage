# :nodoc:
class StateChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'state_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def update_from_client(data)
    updates = data.fetch('updates')
    url = updates.fetch('url')
    repo = Repo.first
    unless repo
      msg = 'REPO NOT FOUND!  If on development env, load fixture data (run bin/setup).'
      Rails.logger.error(msg)
      fail msg
    end
    repo.update!(url: url)
  end
end
