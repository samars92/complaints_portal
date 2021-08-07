from flask import Blueprint, session,abort, render_template
from flask import json, request, jsonify
from complaints.models import Complaint


add_complaint = Blueprint('add_complaint', __name__)
get_complaints = Blueprint('get_complaints', __name__)
get_all_complaints = Blueprint('get_all_complaints', __name__)
update_complaint = Blueprint('update_complaint', __name__)


@add_complaint.route('/add_complaint', methods=["POST"])
def submit_complaint():
    '''
    this view is for complaint creation
    :return: status
    '''
    data = request.get_json()
    category = data['category']
    contacted = data['contactedBefore']
    first_time = data['firstTime']
    complaint_body = data['complaintBody']
    user_id = data['user_id']

    if user_id:
        complaint = Complaint(
            category=category,
            contacted=int(contacted),
            first_time=int(first_time),
            complaint_body=complaint_body,
            status="pending_resolution",
            user_id=user_id
        )
    else:
        return jsonify({'message': 'log in'}), 400

    complaint.save()
    return jsonify({'message': "added"}), 200


@get_complaints.route('/<int:user_id>/get_complaints', methods=["GET"])
def get_user_complaints(user_id):
    '''
    this view is retrieve complaints per user
    :param user_id:
    :return: json of complaints
    '''
    result = {}
    complaints = Complaint.query.filter(Complaint.user_id == user_id).all()
    for item in complaints:
        result[item.id] = {'status': item.status, 'body': item.complaint_body}
    return jsonify(result), 200


@get_all_complaints.route('/get_all_complaints', methods=["GET"])
def get_user_complaints():
    '''
    this view to retrieve all complaints
    :return: json of complaints
    '''
    result = {}
    complaints = Complaint.query.all()
    for item in complaints:
        result[item.id] = {'status': item.status, 'body': item.complaint_body}
    return jsonify(result), 200


@update_complaint.route('/update_complaint', methods=["PUT"])
def update_complaint_status():
    '''
    this view only updates the status of the complaint
    :return:
    '''
    data = request.get_json()
    complaint_id = data['complaintId']
    complaint_status = data['status']
    updated_by = data['user_id']

    complaint = Complaint.query.filter(Complaint.id == complaint_id).first()
    if complaint:
        complaint.status = complaint_status
        complaint.updated_by = updated_by
        complaint.save()
        return jsonify("success"), 200



