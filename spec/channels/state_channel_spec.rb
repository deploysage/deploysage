require 'rails_helper'

RSpec.describe StateChannel do
  let(:connection) { double(identifiers: []) }
  let(:identifier) { double }

  subject { StateChannel.new(connection, identifier) }

  describe '#subscribed' do
    it 'streams' do
      expect(subject).to receive(:stream_from)
      subject.subscribed
    end
  end

  describe '#unsubscribed' do
    it 'does nothing yet' do
      subject.unsubscribed
    end
  end

  describe '#update_from_client' do
    let(:data) do
      {
        'updates' => {
          'url' => 'updated url',
        },
      }
    end

    it 'applies changes to repo' do
      subject.update_from_client(data)
      expect(Repo.first.url).to eq('updated url')
    end

    it 'fails if repo not found' do
      allow(Repo).to receive(:first).and_return(nil)
      expect do
        subject.update_from_client(data)
      end.to raise_error(/REPO NOT FOUND/)
    end
  end
end
