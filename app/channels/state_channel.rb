# :nodoc:
class StateChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'state_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  # Client Operations:

  def update(payload)
    type = payload.fetch('type')
    clazz = type.classify.constantize
    id = payload.fetch('id')
    model = clazz.find(id)
    data = payload.fetch('data')
    data_with_underscore_keys = data.each_with_object({}) do |value, memo|
      memo[value[0].underscore] = value[1]
    end
    model.update_attributes!(data_with_underscore_keys)
  end
end
