require 'rails_helper'

RSpec.describe StateChannel do
  let(:connection) { double(identifiers: [], pubsub: nil) }
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

  describe '#update' do
    let(:repo) { repos(:fixture_repo_1) }
    let(:repo_id) { repo.id }
    let(:payload) do
      p repo
      {
        'type' => 'repo',
        'id' => repo_id,
        'data' => {
          'url' => 'updated url',
          'githubIdentifier' => 42,
        },
      }
    end

    it 'applies changes to model' do
      subject.update(payload)
      expect(repo.reload.url).to eq('updated url')
    end

    it 'converts camel case attributes' do
      subject.update(payload)
      expect(repo.reload.github_identifier).to eq(42)
    end

    describe 'when model not found' do
      let(:repo_id) { 0 }
      it 'fails if model not found' do
        expect do
          subject.update(payload)
        end.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
